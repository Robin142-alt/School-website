$srcDir = "c:\Users\user\Desktop\PROJECTS\School web\src"

$files = Get-ChildItem -Path $srcDir -Recurse -Include *.tsx,*.ts

# Also update manifest and opengraph
$extraFiles = @(
    "$srcDir\app\manifest.ts",
    "$srcDir\app\opengraph-image.tsx"
)

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($null -eq $content) { continue }

    $original = $content

    # Color token replacements (order matters - do specific/longer patterns first)
    # brand-berry -> brand-maroon
    $content = $content -replace 'brand-berry', 'brand-maroon'

    # brand-forest -> brand-maroon (for most uses as the primary dark accent)
    $content = $content -replace 'brand-forest', 'brand-maroon'

    # brand-sage -> brand-blush
    $content = $content -replace 'brand-sage', 'brand-blush'

    # brand-sunset -> brand-maroon-light
    $content = $content -replace 'brand-sunset', 'brand-maroon-light'

    # Fix raw color references in gradients/shadows (old berry/forest rgba values)
    $content = $content -replace 'rgba\(122,33,74,', 'rgba(122,30,46,'
    $content = $content -replace 'rgba\(122, 33, 74,', 'rgba(122, 30, 46,'
    $content = $content -replace 'rgba\(14,97,86,', 'rgba(92,20,32,'
    $content = $content -replace 'rgba\(14, 97, 86,', 'rgba(92, 20, 32,'

    # Fix footer/dark section gradient colors (old hex #5a1b44 -> maroon gradient)
    $content = $content -replace '#5a1b44', '#7a1e2e'
    $content = $content -replace '#0e6156', '#5c1420'

    # Fix opengraph gradient  
    $content = $content -replace 'rgba\(15,75,68,1\)', 'rgba(122,30,46,1)'
    $content = $content -replace 'rgba\(21,37,35,1\)', 'rgba(45,26,30,1)'
    $content = $content -replace 'rgba\(191,138,42,0.95\)', 'rgba(201,149,42,0.95)'

    # Fix manifest colors
    $content = $content -replace '#f5efe3', '#faf5f0'
    $content = $content -replace '#0f4b44', '#7a1e2e'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nDone! All color tokens updated."

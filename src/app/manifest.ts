import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "St. Clare's Maragoli Girls School",
    short_name: "St. Clare's",
    description:
      "A mobile-first school website for parents, students, staff, and alumni.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf5f0",
    theme_color: "#7a1e2e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

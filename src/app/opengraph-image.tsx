import { ImageResponse } from "next/og";

export const alt = "St. Clare's Maragoli Girls School";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "54px",
          background:
            "linear-gradient(135deg, rgba(15,75,68,1) 0%, rgba(21,37,35,1) 55%, rgba(191,138,42,0.95) 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            SC
          </div>
          <div style={{ fontSize: 28, letterSpacing: 2, textTransform: "uppercase" }}>
            Vihiga County, Kenya
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            Grounded girls. Courageous futures.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 900,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            A parent-friendly digital experience for St. Clare&apos;s Maragoli Girls School.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

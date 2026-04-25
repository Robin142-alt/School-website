import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "St. Clare's Maragoli Girls School",
    short_name: "St. Clare's",
    description:
      "A mobile-first school website for parents, students, staff, and alumni.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe3",
    theme_color: "#0f4b44",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

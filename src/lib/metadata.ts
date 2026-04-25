import type { Metadata } from "next";

import { siteConfig } from "@/lib/content/site";
import { absoluteUrl } from "@/lib/utils";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

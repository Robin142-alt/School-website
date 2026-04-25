import { siteConfig } from "@/lib/content/site";
import {
  getLatestNewsFromStore,
  getUpcomingEventsFromStore,
} from "@/lib/repositories/content";

export const revalidate = 300;

export async function GET() {
  const [news, events] = await Promise.all([
    getLatestNewsFromStore(3),
    getUpcomingEventsFromStore(3),
  ]);

  return Response.json({
    school: siteConfig.name,
    updatedAt: new Date().toISOString(),
    news,
    events,
  });
}

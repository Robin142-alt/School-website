import { getDb } from "@/lib/db";

export type InquiryType = "contact" | "admission" | "alumni";

export type InquiryPayload = {
  fullName: string;
  phone: string;
  email?: string;
  topic: string;
  preferredChannel?: string;
  message: string;
  metadata?: Record<string, string>;
};

type StoredInquiry = InquiryPayload & {
  id: string;
  createdAt: string;
  type: InquiryType;
};

export type InquiryRecord = StoredInquiry;

declare global {
  var schoolInquiryStore: StoredInquiry[] | undefined;
}

function getMemoryStore() {
  if (!globalThis.schoolInquiryStore) {
    globalThis.schoolInquiryStore = [];
  }

  return globalThis.schoolInquiryStore;
}

export async function saveInquiry(
  type: InquiryType,
  payload: InquiryPayload,
) {
  const db = getDb();
  const inquiryId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  if (!db) {
    getMemoryStore().push({
      id: inquiryId,
      createdAt,
      type,
      ...payload,
    });

    return {
      id: inquiryId,
      storage: "memory" as const,
    };
  }

  await db.query(
    `
      INSERT INTO inquiries (
        id,
        type,
        full_name,
        phone,
        email,
        topic,
        preferred_channel,
        message,
        metadata,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)
    `,
    [
      inquiryId,
      type,
      payload.fullName,
      payload.phone,
      payload.email ?? null,
      payload.topic,
      payload.preferredChannel ?? null,
      payload.message,
      JSON.stringify(payload.metadata ?? {}),
      createdAt,
    ],
  );

  return {
    id: inquiryId,
    storage: "postgres" as const,
  };
}

export async function getRecentInquiries(limit = 6): Promise<InquiryRecord[]> {
  const db = getDb();

  if (!db) {
    return [...getMemoryStore()]
      .sort(
        (a, b) =>
          Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
      )
      .slice(0, limit);
  }

  const result = await db.query<{
    id: string;
    type: InquiryType;
    full_name: string;
    phone: string;
    email: string | null;
    topic: string;
    preferred_channel: string | null;
    message: string;
    metadata: Record<string, string> | null;
    created_at: string | Date;
  }>(
    `
      SELECT
        id,
        type,
        full_name,
        phone,
        email,
        topic,
        preferred_channel,
        message,
        metadata,
        created_at
      FROM inquiries
      ORDER BY created_at DESC
      LIMIT $1
    `,
    [limit],
  );

  return result.rows.map((row) => ({
    id: row.id,
    type: row.type,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email ?? undefined,
    topic: row.topic,
    preferredChannel: row.preferred_channel ?? undefined,
    message: row.message,
    metadata:
      row.metadata && typeof row.metadata === "object" ? row.metadata : {},
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
  }));
}

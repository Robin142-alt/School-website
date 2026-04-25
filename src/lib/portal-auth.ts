import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const PORTAL_COOKIE_NAME = "st-clares-portal-session";

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompareHex(left: string, right: string) {
  try {
    return timingSafeEqual(
      Buffer.from(left, "hex"),
      Buffer.from(right, "hex"),
    );
  } catch {
    return false;
  }
}

function getExpectedHash() {
  const accessKey = process.env.ADMIN_ACCESS_KEY?.trim();

  if (!accessKey) {
    return null;
  }

  return hashValue(accessKey);
}

export function isPortalConfigured() {
  return Boolean(process.env.ADMIN_ACCESS_KEY?.trim());
}

export async function isPortalAuthenticated() {
  const expectedHash = getExpectedHash();

  if (!expectedHash) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(PORTAL_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return false;
  }

  return safeCompareHex(sessionCookie, expectedHash);
}

export async function createPortalSession(accessKey: string) {
  const expectedHash = getExpectedHash();

  if (!expectedHash) {
    return false;
  }

  const providedHash = hashValue(accessKey.trim());

  if (!safeCompareHex(providedHash, expectedHash)) {
    return false;
  }

  const cookieStore = await cookies();

  cookieStore.set(PORTAL_COOKIE_NAME, expectedHash, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/portal",
    maxAge: 60 * 60 * 12,
  });

  return true;
}

export async function clearPortalSession() {
  const cookieStore = await cookies();

  cookieStore.set(PORTAL_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/portal",
    expires: new Date(0),
  });
}

export async function requirePortalAuth() {
  if (!(await isPortalAuthenticated())) {
    throw new Error("Portal authentication required.");
  }
}

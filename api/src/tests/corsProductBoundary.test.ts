/**
 * Product boundary — the TMS API trusts TMS web origins only.
 *
 * LogisticBay TMS and LogisticBay Timesheets share the logisticbay.com domain
 * but nothing at runtime. A sibling product's subdomain must never pass the
 * TMS API's CORS check. No database access — preflight is answered by the
 * CORS plugin before any route runs.
 */
import "dotenv/config";
import "../lib/env.js";
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { PrismaClient } from "../generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildApp } from "../app.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma  = new PrismaClient({ adapter });

after(async () => { await prisma.$disconnect(); });

async function preflight(origin: string): Promise<string | undefined> {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    const app = await buildApp(prisma, { silent: true });
    const res = await app.inject({
      method: "OPTIONS",
      url: "/health",
      headers: { origin, "access-control-request-method": "GET" },
    });
    await app.close();
    const allowed = res.headers["access-control-allow-origin"];
    return typeof allowed === "string" ? allowed : undefined;
  } finally {
    process.env.NODE_ENV = previous;
  }
}

test("production CORS allows the TMS web origins", async () => {
  for (const origin of [
    "https://logisticbay.com",
    "https://www.logisticbay.com",
    "https://logisticbay.vercel.app",
    "https://tms.logisticbay.com",
  ]) {
    assert.equal(await preflight(origin), origin, `${origin} must be allowed`);
  }
});

test("production CORS rejects sibling products and other subdomains", async () => {
  for (const origin of [
    "https://timesheets.logisticbay.com",
    "https://timesheets-api.logisticbay.com",
    "https://anything.logisticbay.com",
    "https://logisticbay.com.evil.example",
  ]) {
    assert.equal(await preflight(origin), undefined, `${origin} must not be allowed`);
  }
});

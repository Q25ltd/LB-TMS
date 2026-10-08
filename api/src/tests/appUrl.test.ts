/**
 * The TMS web app lives at tms.logisticbay.com — logisticbay.com becomes the
 * LogisticBay brand site, which serves neither /reset-password, /verify-email
 * nor /request/:token. Every link the API emails and every share preview it
 * renders must point at the TMS web app, through the one setting `APP_URL`.
 */
import "dotenv/config";
import { env } from "../lib/env.js";
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "../generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildApp } from "../app.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma  = new PrismaClient({ adapter });

after(async () => { await prisma.$disconnect(); });

const SRC = fileURLToPath(new URL("..", import.meta.url));

test("APP_URL defaults to the TMS web app when it is not set", () => {
  const childEnv = { ...process.env };
  delete childEnv.APP_URL;
  const out = execFileSync(
    process.execPath,
    ["--import", "tsx/esm", "--input-type=module", "-e",
     `const { env } = await import(${JSON.stringify(join(SRC, "lib/env.ts"))}); process.stdout.write(env.APP_URL);`],
    { env: childEnv, encoding: "utf8" },
  );
  assert.equal(out, "https://tms.logisticbay.com");
});

test("the share preview for a request link points at APP_URL", async () => {
  const app = await buildApp(prisma, { silent: true });
  const res = await app.inject({ method: "GET", url: "/og/request/no-such-token" });
  await app.close();

  assert.equal(res.statusCode, 200);
  const html = res.body;
  assert.ok(html.includes(`<meta property="og:url"         content="${env.APP_URL}/request/no-such-token" />`), "og:url");
  assert.ok(html.includes(`<meta property="og:image"       content="${env.APP_URL}/og-image.png" />`), "og:image");
  assert.ok(html.includes(`<meta http-equiv="refresh" content="0; url=${env.APP_URL}/request/no-such-token" />`), "redirect");
});

test("emailed links are built from APP_URL", () => {
  const auth      = readFileSync(join(SRC, "routes/auth.ts"), "utf8");
  const companies = readFileSync(join(SRC, "routes/companies.ts"), "utf8");
  assert.ok(auth.includes("`${env.APP_URL}/reset-password?token="), "password reset link");
  assert.ok(companies.includes("`${env.APP_URL}/verify-email?token="), "verification link");
});

// app.ts is the exception: its CORS allowlist keeps trusting www until the
// TMS has moved, so the web app keeps working on both addresses meanwhile.
test("no API source builds a link to the old www web address", () => {
  const offenders: string[] = [];
  const walk = (dir: string): void => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (name === "generated" || name === "tests" || path === join(SRC, "app.ts")) continue;
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith(".ts") && readFileSync(path, "utf8").includes("www.logisticbay.com")) offenders.push(path);
    }
  };
  walk(SRC);
  assert.deepEqual(offenders, []);
});

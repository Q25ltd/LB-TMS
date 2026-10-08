const REQUIRED = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "DATABASE_URL"] as const;

for (const key of REQUIRED) {
  if (!process.env[key]) {
    throw new Error(`[env] Missing required environment variable: ${key}`);
  }
}

if (process.env.JWT_ACCESS_SECRET === process.env.JWT_REFRESH_SECRET) {
  throw new Error("[env] JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must not be the same value");
}

export const env = {
  JWT_ACCESS_SECRET:  process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  DATABASE_URL:       process.env.DATABASE_URL!,
  /** The TMS web app — every emailed link and share preview points here. */
  APP_URL:            process.env.APP_URL ?? "https://tms.logisticbay.com",
  EMAIL_ENABLED:      !!process.env.SENDGRID_API_KEY,
  /** Optional — AI features disabled when missing */
  ANTHROPIC_API_KEY:  process.env.ANTHROPIC_API_KEY ?? null,
  AI_ENABLED:         !!process.env.ANTHROPIC_API_KEY,
};

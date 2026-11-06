import type { NextConfig } from "next";

// Validate environment variables once at startup so a misconfigured
// `next dev` / `next build` fails immediately with a readable message.
import "./infra/env";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"], // Tambahkan baris ini
};

export default nextConfig;
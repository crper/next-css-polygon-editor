import type { NextConfig } from 'next';
import { BASE_PATH, IS_PRODUCTION } from './src/lib/site';

const nextConfig: NextConfig = {
  ...(IS_PRODUCTION
    ? {
        output: 'export',
        images: {
          unoptimized: true,
        },
        assetPrefix: `${BASE_PATH}/`,
      }
    : {}),
  basePath: BASE_PATH,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;

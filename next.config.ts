import type { NextConfig } from 'next';
import withRspack from 'next-rspack';

const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'next-css-polygon-editor';
const basePath = isProduction ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  /* config options here */
  ...(isProduction
    ? {
        output: 'export',
        images: {
          unoptimized: true,
        },
      }
    : {}),
  basePath: basePath,
  // 确保禁用 trailingSlash，避免 GitHub Pages 路由问题
  trailingSlash: false,
  // 添加环境变量配置
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withRspack(nextConfig);

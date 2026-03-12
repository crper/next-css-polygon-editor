export const REPO_NAME = 'next-css-polygon-editor';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const BASE_PATH = IS_PRODUCTION ? `/${REPO_NAME}` : '';

export function withBasePath(path: string) {
  if (!path.startsWith('/')) {
    return path;
  }

  return `${BASE_PATH}${path}`;
}

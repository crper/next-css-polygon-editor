import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  // 获取basePath

  return (
    <Html lang="zh-CN" className="scroll-smooth">
      <Head></Head>
      <body className="flex min-h-screen flex-col">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950"></div>
        <div className="fixed inset-0 -z-10 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

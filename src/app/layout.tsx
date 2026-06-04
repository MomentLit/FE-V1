import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MomentLit",
  description: "취향이 머무는 순간을 발견하는 MomentLit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

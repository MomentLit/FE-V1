import type { Metadata } from "next";
import "./tailwind.css";

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
      className="h-full bg-white antialiased"
    >
      <body className="m-0 flex min-h-full min-w-0 flex-col bg-white [font-family:Arial,Helvetica,sans-serif] text-[#172129] min-[1181px]:min-w-[1180px]">
        {children}
      </body>
    </html>
  );
}

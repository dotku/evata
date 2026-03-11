import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Campaign Tool | Evata",
  robots: { index: false, follow: false },
};

export default function EmailToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

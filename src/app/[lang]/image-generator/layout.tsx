import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generator | Evata",
  robots: { index: false, follow: false },
};

export default function ImageGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

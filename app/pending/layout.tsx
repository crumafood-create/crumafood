import { Suspense } from "react";

export default function PendingLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
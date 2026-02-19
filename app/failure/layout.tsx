// app/failure/layout.tsx
import { Suspense } from "react";

export default function FailureLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
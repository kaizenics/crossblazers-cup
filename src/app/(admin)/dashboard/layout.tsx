import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
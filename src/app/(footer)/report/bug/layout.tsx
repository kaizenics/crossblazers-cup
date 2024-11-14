import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bug",
  description: "",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

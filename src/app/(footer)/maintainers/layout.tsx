import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Maintainers",
  description: "",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

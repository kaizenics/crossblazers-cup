import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn More",
  description: "",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile, achievements, and game history.",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

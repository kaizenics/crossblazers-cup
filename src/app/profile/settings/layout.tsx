import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "Update your account settings and preferences.",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

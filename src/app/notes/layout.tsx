import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notes",
  description: "View and manage your notes, drafts, and ideas.",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
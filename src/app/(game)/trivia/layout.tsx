import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trivia",
  description: "",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AppSidebar>{children}</AppSidebar>
    </main>
  );
}

import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
    redirect("/conversations");
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-zinc-950">
      <div className="p-8 h-full">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
}

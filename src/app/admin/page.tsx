import prisma from "@/lib/prismadb";

export default async function AdminPage() {
  const usersCount = await prisma.user.count();
  const conversationsCount = await prisma.conversation.count();
  const messagesCount = await prisma.message.count();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <h3 className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Total Users</h3>
        <p className="text-3xl font-bold mt-2 text-black dark:text-white">{usersCount}</p>
      </div>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <h3 className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Total Conversations</h3>
        <p className="text-3xl font-bold mt-2 text-black dark:text-white">{conversationsCount}</p>
      </div>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <h3 className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Total Messages</h3>
        <p className="text-3xl font-bold mt-2 text-black dark:text-white">{messagesCount}</p>
      </div>
    </div>
  );
}

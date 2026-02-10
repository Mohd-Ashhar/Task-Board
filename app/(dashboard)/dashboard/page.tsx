import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.userId as string },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Tasks
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Stay organized. Track your progress.
        </p>
      </div>

      {/* Task Input */}
      <TaskForm />

      {/* Task List */}
      <TaskList tasks={tasks} />
    </div>
  );
}

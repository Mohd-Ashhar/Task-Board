"use client";

import { Task } from "@prisma/client";
import { updateTaskStatus } from "@/app/actions/tasks";
import { useOptimistic, startTransition } from "react";
import { cn } from "@/lib/utils";
import { ClipboardList } from "lucide-react";

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  TODO: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
  IN_PROGRESS: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  DONE: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
};

function formatDate(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Added today";
  if (diffDays === 1) return "Added yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (state, { id, status }: { id: string; status: string }) =>
      state.map((task) => (task.id === id ? { ...task, status } : task))
  );

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    startTransition(() => {
      setOptimisticTasks({ id: taskId, status: newStatus });
    });
    await updateTaskStatus(taskId, newStatus);
  };

  /* ───────── Empty State ───────── */
  if (optimisticTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-5">
          <ClipboardList className="h-7 w-7 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-500">No tasks yet</p>
        <p className="text-xs text-gray-400 mt-1">Add one above to get started!</p>
      </div>
    );
  }

  /* ───────── Task List ───────── */
  return (
    <div className="space-y-3">
      {optimisticTasks.map((task) => {
        const isDone = task.status === "DONE";
        const style = STATUS_STYLES[task.status] ?? STATUS_STYLES.TODO;

        return (
          <div
            key={task.id}
            className={cn(
              "group flex flex-col rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300",
              isDone && "opacity-75"
            )}
          >
            {/* Top Row: Title + Status Pill Dropdown */}
            <div className="flex items-center justify-between gap-4">
              {/* Title */}
              <span
                className={cn(
                  "text-sm font-medium text-gray-800 transition-colors duration-200",
                  isDone && "line-through text-gray-400"
                )}
              >
                {task.title}
              </span>

              {/* Status Pill Dropdown (merged badge + select) */}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className={cn(
                  "appearance-none rounded-full px-3 py-1 text-xs font-medium border cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1",
                  style.bg,
                  style.text,
                  style.border
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.35rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1em 1em",
                  paddingRight: "1.75rem",
                }}
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            {/* Bottom Row: Date */}
            <span className="text-xs text-gray-400 mt-2">
              {formatDate(task.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

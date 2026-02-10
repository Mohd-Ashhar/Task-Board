"use client";

import { useActionState } from "react";
import { createTask, TaskState } from "@/app/actions/tasks";
import { Plus, Loader2 } from "lucide-react";
import { useRef, useEffect } from "react";

const initialState: TaskState = { message: "", error: {} };

export function TaskForm() {
  const [state, action, isPending] = useActionState(createTask, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "Task created") {
      formRef.current?.reset();
    }
  }, [state.message]);

  return (
    <form
      ref={formRef}
      action={action}
      className="mb-8"
    >
      <div className="flex gap-2">
        <input
          name="title"
          placeholder="What needs to be done?"
          required
          className="flex-1 h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1.5" />
              Add
            </>
          )}
        </button>
      </div>
      {state.error?.title && (
        <p className="text-red-500 text-xs mt-2 ml-1">{state.error.title[0]}</p>
      )}
      {state.error?.root && (
        <p className="text-red-500 text-xs mt-2 ml-1">{state.error.root[0]}</p>
      )}
    </form>
  );
}

// src/components/Sidebar.tsx
import React from "react";
import Logo from "@/components/Logo";
import TaskList from "@/components/TaskList";
import AddTask from "@/components/AddTask";
import { useTasks } from "@/context/TaskContext";

const Sidebar: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();

  // Filter tasks that are not assigned to any board
  const unassignedTasks = tasks?.filter((task) => !task.board);

  return (
    <div className="border-r bg-muted/40 flex flex-col h-full">
      <Logo />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-xl font-bold">Tasks</h2>
          <AddTask onAddTask={(task) => addTask(task)} />
        </div>
        <nav className="flex-1 px-2 text-sm font-medium lg:px-4 overflow-y-auto">
          <TaskList
            tasks={unassignedTasks}
            onDeleteTask={(id) => deleteTask(id)}
            onToggleTaskCompletion={(id) => toggleTaskCompletion(id)}
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

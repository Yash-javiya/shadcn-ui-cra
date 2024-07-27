// src/components/TaskList.tsx
import React from "react";
import TaskItem from "@/components/TaskItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Task } from "@/api/tasks";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
  onToggleTaskCompletion: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onToggleTaskCompletion,
}) => {
  return (
    <ScrollArea className="h-full max-h-[calc(100vh-200px)] overflow-y-auto">
      {!tasks || tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onToggle={() => onToggleTaskCompletion(task.id)}
          />
        ))
      )}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default TaskList;

// src/components/TaskItem.tsx
import React from "react";
import { useDrag } from "react-dnd";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Task } from "@/api/tasks";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  const [, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, boardId: task.board },
  });

  return (
    <div
      ref={dragRef}
      className="flex items-center space-x-2 p-2 border rounded-md mb-2"
    >
      <Checkbox
        id={task.id.toString()}
        checked={task.completed}
        onCheckedChange={onToggle}
      />
      <label htmlFor={task.id.toString()} className="text-sm flex-1">
        {task.todo}
      </label>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <TrashIcon className="w-5 h-5 text-foreground" />
      </Button>
    </div>
  );
};

export default TaskItem;

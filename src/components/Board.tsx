// src/components/Board.tsx
import React from "react";
import { useDrop } from "react-dnd";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/context/TaskContext";
import { Board as BoardType } from "@/api/boards";

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const { tasks, deleteTask, toggleTaskCompletion, moveTask } = useTasks();

  const boardTasks = tasks.filter((task) => task.board === board.id);

  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; boardId: number }) => {
      moveTask(item.id, board.id);
    },
  });

  return (
    <div ref={dropRef} className="flex flex-col w-72 p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-2">{board.title}</h2>
      <ScrollArea className="h-full max-h-[calc(100vh-250px)] overflow-y-auto">
        {boardTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={{ ...task, board: board.id }}
            onDelete={() => deleteTask(task.id)}
            onToggle={() => toggleTaskCompletion(task.id)}
          />
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default Board;

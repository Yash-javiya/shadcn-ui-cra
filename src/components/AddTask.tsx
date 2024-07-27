// src/components/AddTask.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";

interface AddTaskProps {
  onAddTask: (task: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [task, setTask] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(task);
    setTask("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}>
        <PlusIcon className="w-5 h-5 text-foreground" />
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Task</DialogTitle>
            <DialogDescription>
              Enter the details for the new task.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTask}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task">Task</Label>
                <Input
                  id="task"
                  type="text"
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Task
              </Button>
            </div>
          </form>
          <DialogClose asChild>
            <Button variant="ghost" className="mt-4">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTask;

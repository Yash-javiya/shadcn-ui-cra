// src/components/AddBoard.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoards } from "@/context/BoardContext";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

const AddBoard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { addBoard } = useBoards();

  const handleAddBoard = (e: React.FormEvent) => {
    e.preventDefault();
    addBoard(title);
    setTitle("");
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
            <DialogTitle>Add a New Board</DialogTitle>
            <DialogDescription>
              Enter the title for the new board.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBoard}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter board title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Board
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

export default AddBoard;

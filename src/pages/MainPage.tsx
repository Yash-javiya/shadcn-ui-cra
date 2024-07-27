import AddBoard from "@/components/AddBoard";
import Board from "@/components/Board";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBoards } from "@/context/BoardContext";
import DnDContext from "@/context/DnDContext";
import React from "react";

const MainPage: React.FC = () => {
  const { boards } = useBoards();

  return (
    <DnDContext>
      <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Boards</h1>
              <AddBoard />
            </div>
            <div className="flex-1 relative">
              <ScrollArea className="absolute inset-0 overflow-auto">
                {!boards || boards.length === 0 ? (
                  <p>No boards available</p>
                ) : (
                  boards && (
                    <>
                      <div className="flex space-x-4 w-full h-full">
                        {boards.map((board) => (
                          <Board key={board.id} board={board} />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </>
                  )
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </DnDContext>
  );
};

export default MainPage;

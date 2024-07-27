import { DragEvent, SVGProps, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { JSX } from "react/jsx-runtime";

export function Component() {
  const [tasks, setTasks] = useState([
    { id: "task1", text: "Design onboarding" },
    { id: "task2", text: "Write hiring criteria" },
    { id: "task3", text: "Publish blog post" },
    { id: "task4", text: "Book offsite" },
    { id: "task5", text: "Setup Zapier integration" },
    { id: "task6", text: "Todo" },
    { id: "task7", text: "Buy more coffee filters" },
    { id: "task8", text: "Cancel Disney+" },
    { id: "task9", text: "Donate to Unicef" },
    { id: "task10", text: "Todo" },
  ]);
  const onDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };
  const onDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const onDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = [...tasks];
    const draggedTaskIndex = tasks.findIndex((task) => task.id === taskId);
    const [removedTask] = updatedTasks.splice(draggedTaskIndex, 1);
    updatedTasks.splice(index, 0, removedTask);
    setTasks(updatedTasks);
  };
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-background text-foreground p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Todos</h2>
          <Button variant="ghost" size="icon">
            <PlusIcon className="w-5 h-5 text-foreground" />
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">This week</h3>
            <div className="grid gap-2">
              {tasks.slice(0, 6).map((task, index) => (
                <Card
                  key={task.id}
                  className="p-4"
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={task.id} />
                    <label htmlFor={task.id} className="text-sm">
                      {task.text}
                    </label>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">This month</h3>
            <div className="grid gap-2">
              {tasks.slice(6).map((task, index) => (
                <Card
                  key={task.id}
                  className="p-4"
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index + 6)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={task.id} />
                    <label htmlFor={task.id} className="text-sm">
                      {task.text}
                    </label>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <section />
          <section className="mt-auto" />
        </div>
      </aside>
      <main className="flex-1 p-6 bg-muted/40">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div>
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">March 2022</h1>
                <span className="text-xl">/</span>
                <span className="text-xl">W9</span>
                <Button variant="ghost" size="icon">
                  <ChevronLeftIcon className="w-5 h-5 text-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronRightIcon className="w-5 h-5 text-foreground" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="default">Today</Button>
                <Button variant="secondary">Share</Button>
              </div>
            </header>
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">07</p>
                <p className="text-sm">mon</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">08</p>
                <p className="text-sm">tue</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">09</p>
                <p className="text-sm">wed</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">10</p>
                <p className="text-sm">thu</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">11</p>
                <p className="text-sm">fri</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">12</p>
                <p className="text-sm">sat</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-lg font-bold">13</p>
                <p className="text-sm">sun</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Monday sync</p>
                    <p className="text-sm">9 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Weekly design</p>
                    <p className="text-sm">10:02 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Design onboarding</p>
                    <p className="text-sm">10 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Blog post</p>
                    <p className="text-sm">10:30 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Book offsite</p>
                    <p className="text-sm">8:45 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Lunch break</p>
                    <p className="text-sm">12 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Emails</p>
                    <p className="text-sm">1 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Book for interview</p>
                    <p className="text-sm">1 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Write news</p>
                    <p className="text-sm">1 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Design our website</p>
                    <p className="text-sm">2 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Cinema</p>
                    <p className="text-sm">10:30 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Clean house</p>
                    <p className="text-sm">11:30 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Laundry</p>
                    <p className="text-sm">10:30 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Brunch</p>
                    <p className="text-sm">12 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Date night</p>
                    <p className="text-sm">1:30 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
              <Card className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Deadpool</p>
                    <p className="text-sm">1 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5 text-accent-foreground" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          <div className="hidden md:block">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MoveHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

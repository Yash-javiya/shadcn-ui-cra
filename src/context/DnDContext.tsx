// src/context/DnDContext.tsx
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const DnDContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DnDContext;

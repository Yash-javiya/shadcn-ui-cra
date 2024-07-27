import {
  createBoard,
  deleteBoard as apiDeleteBoard,
  fetchBoards as apiFetchBoards,
  updateBoard as apiUpdateBoard,
  Board,
} from "@/api/boards";
import { useAuth } from "@/context/AuthContext";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface BoardContextType {
  boards: Board[];
  addBoard: (title: string) => void;
  deleteBoard: (boardId: number) => void;
  updateBoard: (id: number, title: string) => void;
  fetchBoards: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const BoardProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const { token, user } = useAuth();

  const handleError = (error: any) => {
    // Log the error to the console for debugging purposes
    console.error("Board Context Error:", error);
    // You can also send the error to an external logging service here
  };

  const fetchBoards = useCallback(async () => {
    try {
      if (token) {
        const fetchedBoards = await apiFetchBoards(token);
        setBoards(fetchedBoards);
      }
    } catch (err) {
      handleError(err);
    }
  }, [token]);

  const addBoard = async (title: string) => {
    try {
      if (token && user) {
        const newBoard = await createBoard(title, user.id, token);
        setBoards((prevBoards) => [...prevBoards, newBoard]);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const deleteBoard = async (boardId: number) => {
    try {
      if (token) {
        await apiDeleteBoard(boardId, token);
        setBoards((prevBoards) =>
          prevBoards.filter((board) => board.id !== boardId)
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  const updateBoard = async (id: number, title: string) => {
    try {
      if (token) {
        const updatedBoard = await apiUpdateBoard(id, title, token);
        setBoards((prevBoards) =>
          prevBoards.map((board) => (board.id === id ? updatedBoard : board))
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        deleteBoard,
        updateBoard,
        fetchBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

const useBoards = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoards must be used within a BoardProvider");
  }
  return context;
};

export { BoardProvider, useBoards };

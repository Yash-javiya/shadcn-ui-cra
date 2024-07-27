import {
  createTask,
  deleteTask as apiDeleteTask,
  fetchTasks as apiFetchTasks,
  updateTask as apiUpdateTask,
  Task,
} from "@/api/tasks";
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

interface TaskContextType {
  tasks: Task[];
  addTask: (todo: string) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  moveTask: (taskId: number, toBoardId: number) => void;
  fetchTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token, user } = useAuth();

  const handleError = (error: any) => {
    // Log the error to the console for debugging purposes
    console.error("Task Context Error:", error);
    // You can also send the error to an external logging service here
  };

  const fetchTasks = useCallback(async () => {
    try {
      if (token) {
        const fetchedTasks = await apiFetchTasks(token);
        setTasks(fetchedTasks);
      }
    } catch (err) {
      handleError(err);
    }
  }, [token]);

  const addTask = async (todo: string) => {
    try {
      if (token && user) {
        console.log("user", user);
        const newTask = await createTask(todo, user.id, token);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      if (token) {
        await apiDeleteTask(taskId, token);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (err) {
      handleError(err);
    }
  };

  const toggleTaskCompletion = async (taskId: number) => {
    try {
      if (token) {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
          const updatedTask = await apiUpdateTask(
            taskId,
            { completed: !task.completed },
            token
          );
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
          );
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  const moveTask = async (taskId: number, toBoardId: number) => {
    try {
      if (token) {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
          const updatedTask = await apiUpdateTask(
            taskId,
            { board: toBoardId },
            token
          );
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
          );
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        moveTask,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTasks };

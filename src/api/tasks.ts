import { fetchWithToken } from "@/api/apiUtils";

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  board: number;
  user: number;
}

export const fetchTasks = async (token: string): Promise<Task[]> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/tasks/`,
      {
        method: "GET",
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (
  todo: string,
  userId: number,
  token: string
): Promise<Task> => {
  try {
    const dataBody = {
      todo: todo,
      user: userId,
    };
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/tasks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  task: Partial<Task>,
  token: string
): Promise<Task> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/tasks/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

export const deleteTask = async (
  id: number,
  token: string
): Promise<{ isDeleted: boolean; deletedOn: string }> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/tasks/${id}/`,
      {
        method: "DELETE",
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

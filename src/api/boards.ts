import { fetchWithToken } from "./apiUtils";
import { Task } from "@/api/tasks";

export interface Board {
  id: number;
  title: string;
  tasks: Task[];
}

export const fetchBoards = async (token: string): Promise<Board[]> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/boards/`,
      {
        method: "GET",
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch boards:", error);
    throw error;
  }
};

export const createBoard = async (
  title: string,
  user: number,
  token: string
): Promise<Board> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/boards/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, user }),
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to create board:", error);
    throw error;
  }
};

export const updateBoard = async (
  id: number,
  title: string,
  token: string
): Promise<Board> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/boards/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to update board:", error);
    throw error;
  }
};

export const deleteBoard = async (
  id: number,
  token: string
): Promise<{ isDeleted: boolean; deletedOn: string }> => {
  try {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_BASE_URL}/boards/${id}/`,
      {
        method: "DELETE",
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Failed to delete board:", error);
    throw error;
  }
};

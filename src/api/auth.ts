// src/api/auth.ts
import { APIError } from "@/api/apiUtils";

export interface User {
  id: number;
  username: string;
  access: string;
  refresh: string;
}

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: APIError = {
      message: errorData.error_message || "Network response was not ok",
      status: errorData.status || response.status,
    };
    throw error;
  }

  console.log(response);

  const data = await response.json();
  return data;
};

export const signup = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: APIError = {
      message: errorData.error_message || "Network response was not ok",
      status: errorData.status || response.status,
    };
    throw error;
  }

  const data = await response.json();
  return data;
};

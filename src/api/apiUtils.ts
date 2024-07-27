export interface APIError {
  message: string;
  status: number;
}

export const fetchWithToken = async (
  url: string,
  options: RequestInit,
  token: string
): Promise<any> => {
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: APIError = {
      message: errorData.error_message || "Network response was not ok",
      status: errorData.status || response.status,
    };
    throw error;
  }

  return response.json();
};

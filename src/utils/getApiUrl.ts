import { API_URL } from "@/config/constants";

export const getApiUrl = (offset: number, limit: number): string => {
  return `${API_URL}?_start=${offset}&_limit=${limit}`;
};

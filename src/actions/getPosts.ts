// actions/getPosts.ts

"use server";
import { getApiUrl } from "@/utils/getApiUrl";
import { handleError } from "@/utils/handleError";
import { Post } from "@/types/Post";

export const getPosts = async (
  offset: number,
  limit: number
): Promise<Post[]> => {
  const url = getApiUrl(offset, limit);

  try {
    const response = await fetch(url);
    const data = (await response.json()) as Post[];

    if (!response.ok) {
      throw await handleError(response);
    }

    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error happened: ${error}`);
  }
};

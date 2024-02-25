// components/PostList.tsx

"use client";
import { useState } from "react";
import { getPosts } from "@/actions/getPosts";
import { Post } from "@/types/Post";
import PostCard from "./PostCard";
import { POSTS_PER_PAGE } from "@/config/Constants";

type PostListProps = {
  initialPosts: Post[];
};

export default function PostList({ initialPosts }: PostListProps) {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMorePosts = async () => {
    if (hasMoreData) {
      const apiPosts = await getPosts(offset, POSTS_PER_PAGE);

      if (apiPosts.length < POSTS_PER_PAGE) {
        setHasMoreData(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
    }
  };

  return (
    <>
      <div className="post-list [counter-reset:post-index]">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="text-center mt-5">
        {hasMoreData ? (
          <button
            className="px-4 py-3 bg-slate-500 hover:bg-slate-600 text-slate-50 rounded-md"
            onClick={loadMorePosts}
          >
            Load More Posts
          </button>
        ) : (
          <p className="text-slate-600">No more posts to load</p>
        )}
      </div>
    </>
  );
}

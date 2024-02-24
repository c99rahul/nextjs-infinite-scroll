// components/PostListInfiniteRIO.tsx

"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/actions/getPosts";
import { Post } from "@/types/Post";
import PostCard from "./PostCard";
import { useInView } from "react-intersection-observer";
import { POSTS_PER_PAGE } from "@/config/Constants";

type PostListProps = {
  initialPosts: Post[];
};

export default function PostListInfiniteRIS({ initialPosts }: PostListProps) {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [targetRef, inView] = useInView();
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMorePosts = async () => {
    if (hasMoreData) {
      const apiPosts = await getPosts(offset, POSTS_PER_PAGE);
      if (apiPosts.length < POSTS_PER_PAGE) {
        setHasMoreData(false); // No more posts to load
      }
      setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
    }
  };

  useEffect(() => {
    if (inView && hasMoreData) {
      loadMorePosts();
    }
  }, [inView, hasMoreData]);

  return (
    <>
      <div className="post-list [counter-reset: post-index]">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center text-slate-600 mt-5">
        {(hasMoreData && <div ref={targetRef}>Loading...</div>) || (
          <p className="text-slate-600">No more posts to load</p>
        )}
      </div>
    </>
  );
}

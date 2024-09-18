// components/PostListInfinite.tsx

"use client";
import React, { useState, useRef, useEffect } from "react";
import PostCard from "./PostCard";
import { Post } from "@/types/Post";
import { getPosts } from "@/actions/getPosts";
import { POSTS_PER_PAGE } from "@/config/constants";

type PostListProps = {
  initialPosts: Post[];
};

export default function PostListInfinite({ initialPosts }: PostListProps) {
  const [offset, setOffset] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMoreData, setHasMoreData] = useState(true);
  const scrollTrigger = useRef(null);

  const loadMorePosts = async () => {
    if (hasMoreData) {
      const apiPosts = await getPosts(offset, POSTS_PER_PAGE);

      if (!apiPosts.length) {
        setHasMoreData(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  }, [hasMoreData, offset]);

  return (
    <>
      <div className="post-list [counter-reset: post-index]">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center text-slate-600 mt-5">
        {hasMoreData ? (
          <div ref={scrollTrigger}>Loading...</div>
        ) : (
          <p className="text-slate-600">No more posts to load</p>
        )}
      </div>
    </>
  );
}

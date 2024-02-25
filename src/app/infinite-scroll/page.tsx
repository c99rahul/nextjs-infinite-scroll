// app/infininte-scroll/page.tsx

import { getPosts } from "@/actions/getPosts";
import PostListInfinite from "@/components/PostListInfinite";
import { POSTS_PER_PAGE } from "@/config/constants";

export default async function InfiniteScroll() {
  const initialPosts = await getPosts(0, POSTS_PER_PAGE);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">Loading posts on scroll</h1>
        <h3 className="text-center mb-5 text-slate-600">
          With no additional dependencies
        </h3>
        <PostListInfinite initialPosts={initialPosts} />
      </div>
    </>
  );
}

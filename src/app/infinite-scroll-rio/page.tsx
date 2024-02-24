// app/infininte-scroll-rio/page.tsx

import PostListInfiniteRIO from "@/components/PostListInfiniteRIO";
import { getPosts } from "@/actions/getPosts";
import { POSTS_PER_PAGE } from "@/config/Constants";

export default async function InfiniteScroll() {
  const initialPosts = await getPosts(0, POSTS_PER_PAGE);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">Loading posts on scroll</h1>
        <h3 className="text-center mb-5 text-slate-600">
          With an additional dependency (
          <a href="https://www.npmjs.com/package/react-intersection-observer">
            React Intersection Observer
          </a>
          )
        </h3>
        <PostListInfiniteRIO initialPosts={initialPosts} />
      </div>
    </>
  );
}

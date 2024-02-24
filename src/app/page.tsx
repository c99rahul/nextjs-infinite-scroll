import PostList from "@/components/PostList";
import { getPosts } from "@/actions/getPosts";
import { POSTS_PER_PAGE } from "@/config/Constants";

export default async function Home() {
  const initialPosts = await getPosts(0, POSTS_PER_PAGE);

  return (
    <>
      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-center text-2xl mb-2">
          Loading posts asynchronously
        </h1>
        <h3 className="text-center mb-5 text-slate-600">
          Just on a button click
        </h3>
        <PostList initialPosts={initialPosts} />
      </div>
    </>
  );
}

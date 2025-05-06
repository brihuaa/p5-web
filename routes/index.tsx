// routes/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import ToggleView, { Post } from "../islands/ToggleView.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const res = await fetch("https://back-p5-y0e1.onrender.com/api/posts");
    const json = await res.json();
    const posts: Post[] = Array.isArray(json.data.posts) ? json.data.posts : [];
    return ctx.render({ posts });
  },
};

export default function Home({ data }: PageProps<{ posts: Post[] }>) {
  return (
    <main>
      <header class="module-header">
        <h1>Listado de Posts</h1>
      </header>
      <div class="module-content">
        <ToggleView posts={data.posts} />
      </div>
    </main>
  );
}

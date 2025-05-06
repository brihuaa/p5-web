// islands/ToggleView.tsx
import { useSignal } from "@preact/signals";

export type Post = {
  _id: string;
  title: string;
  summary: string;
  cover?: string;
  author: string;
};

export default function ToggleView({ posts }: { posts: Post[] }) {
  const isGrid = useSignal(false);
  return (
    <>
      <header class="module-header">
        <span>{isGrid.value ? "Cuadrícula" : "Lista"}</span>
        <button
          class="boton"
          onClick={() => (isGrid.value = !isGrid.value)}
        >
          {isGrid.value ? "Vista Lista" : "Vista Cuadrícula"}
        </button>
      </header>
      <div class={isGrid.value ? "grid-container" : "list-container"} id="posts">
        {posts.map((post) => (
          <article key={post._id} class="card">
            {isGrid.value && post.cover && (
              <img src={post.cover} alt="Cover" class="cover" />
            )}
            <h2 class="font-bold">{post.title}</h2>
            <p class="text-sm text-gray-600">{post.author}</p>
            {!isGrid.value && <p class="summary">{post.summary}</p>}
          </article>
        ))}
      </div>
    </>
  );
}

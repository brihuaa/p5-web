// routes/search.tsx
import { Handlers, PageProps } from "$fresh/server.ts";

type Post = {
  _id: string;
  title: string;
  author: string;
};

type Data = {
  posts: Post[];
  query: string;
};

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q")?.trim() ?? "";
    const apiURL = query
      ? `https://back-p5-y0e1.onrender.com/api/post?search=${encodeURIComponent(query)}`
      : `https://back-p5-y0e1.onrender.com/api/post`;
    const res = await fetch(apiURL);
    const json = await res.json();
    const posts: Post[] = Array.isArray(json.data?.posts) ? json.data.posts : [];
    return ctx.render({ posts, query });
  },
};

export default function SearchPage({ data }: PageProps<Data>) {
  return (
    <main class="p-4">
      <h1 class="text-2xl font-bold mb-4">Buscar Posts</h1>
      <form method="get" class="flex gap-2 mb-6">
        <input
          name="q"
          class="border p-2 flex-grow"
          placeholder="Escribe para buscar..."
          value={data.query}
          onInput={(e) => (e.currentTarget.value = e.currentTarget.value)}
        />
        <button type="submit" class="boton px-4">
          Buscar
        </button>
      </form>
      <div class="space-y-4">
        {data.posts.length > 0
          ? data.posts.map(p => (
            <article key={p._id} class="border p-4 rounded">
              <h2 class="font-bold">{p.title}</h2>
              <p class="text-sm text-gray-600">por {p.author}</p>
            </article>
          ))
          : <p class="text-gray-600">No se encontraron resultados.</p>}
      </div>
    </main>
  );
}

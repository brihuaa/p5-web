import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type Post = {
  _id: string;
  title: string;
  author: string;
};

export default function Search() {
  const term = useSignal("");
  const posts = useSignal<Post[]>([]);

  useEffect(() => {
    (async () => {
      const url = term.value.trim()
        ? `https://back-p5-y0e1.onrender.com/api/post?search=${encodeURIComponent(term.value)}`
        : `https://back-p5-y0e1.onrender.com/api/post`;
      const res = await fetch(url);        
      const json = await res.json();
      posts.value = Array.isArray(json.data?.posts)
        ? json.data.posts
        : [];                             
    })();
  }, [term.value]);

  return (
    <>
      <div class="flex gap-2 mb-4">
        <input
          class="border p-2 flex-grow"
          placeholder="Buscar posts..."
          value={term.value}
          onInput={e => (term.value = e.currentTarget.value)}  
        />
      </div>
      <div class="space-y-4">
        {posts.value.length > 0
          ? posts.value.map(p => (
            <article key={p._id} class="border p-4 rounded">
              <h2 class="font-bold">{p.title}</h2>
              <p class="text-sm text-gray-600">por {p.author}</p>
            </article>
          ))
          : <p class="text-gray-600">No se encontraron resultados.</p>}
      </div>
    </>
  );
}

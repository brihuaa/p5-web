/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

type Data = null;

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    return ctx.render(null);
  },
};

export default function CreatePage(_: PageProps<Data>) {
  const form = useSignal({ title: "", cover: "", content: "", author: "" });
  const sending = useSignal(false);
  const message = useSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    sending.value = true;
    message.value = "";

    try {
      const res = await fetch("https://back-p5-y0e1.onrender.com/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      });

      const json = await res.json();
      if (res.ok) {
        message.value = `Creado con ID ${json.data.id}`;
        form.value = { title: "", cover: "", content: "", author: "" }; // Reset form
      } else {
        message.value = `Error: ${json.message}`;
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      message.value = "Error al enviar el formulario. Por favor, inténtalo de nuevo.";
    } finally {
      sending.value = false;
    }
  };

  return (
    <main class="module p-4">
      <header class="module-header mb-4">
        <h1>Crear Post</h1>
      </header>
      <div class="module-content space-y-4">
        {message.value && <p class={`text-${message.value.startsWith("Error") ? "red" : "green"}-600`}>{message.value}</p>}
        <form onSubmit={handleSubmit} class="space-y-4">
          <input
            class="w-full border p-2"
            placeholder="Título"
            required
            minLength={3}
            value={form.value.title}
            onInput={(e) => (form.value.title = (e.target as HTMLInputElement).value)}
          />
          <input
            class="w-full border p-2"
            placeholder="Cover URL"
            required
            value={form.value.cover}
            onInput={(e) => (form.value.cover = (e.target as HTMLInputElement).value)}
          />
          <textarea
            class="w-full border p-2"
            placeholder="Contenido"
            required
            minLength={10}
            value={form.value.content}
            onInput={(e) => (form.value.content = (e.target as HTMLTextAreaElement).value)}
          />
          <input
            class="w-full border p-2"
            placeholder="Autor"
            required
            value={form.value.author}
            onInput={(e) => (form.value.author = (e.target as HTMLInputElement).value)}
          />
          <button
            type="submit"
            class="boton"
            disabled={sending.value}
          >
            {sending.value ? "Enviando..." : "Crear Post"}
          </button>
        </form>
      </div>
    </main>
  );
}

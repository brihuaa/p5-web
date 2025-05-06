import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Post = {
  _id: string;
  title: string;
  author: string;
  content: string;
  likes: number;
  cover: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PostResponse = {
  success: boolean;
  data: Post;
};

export type Data = {
  post: Post;
};

export const handler: Handlers<Data> = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { id } = ctx.params;
    const response = await axios.get<PostResponse>(`https://back-p5-y0e1.onrender.com/api/posts/${id}`);

    return ctx.render({ post: response.data.data });
  },
};

export default function Page(props: PageProps<Data>) {
  return (
    <div>
      <h1>{props.data.post.author}</h1>
      <h2>{props.data.post.title}</h2>
      <img src={props.data.post.cover} alt="cover" />
      <p>{props.data.post.content}</p>
    </div>
  );
}
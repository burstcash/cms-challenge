"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { trpc } from "@/trpc/client";

export default function ItemEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const itemId = Number(id);

  const utils = trpc.useUtils();
  const item = trpc.byId.useQuery({ id: itemId });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (item.data && !loaded) {
      setTitle(item.data.title);
      setBody(item.data.body);
      setLoaded(true);
    }
  }, [item.data, loaded]);

  const save = trpc.update.useMutation({
    onSuccess: () => utils.byId.invalidate({ id: itemId }),
  });

  if (item.isPending) return <p className="meta">Loading item.</p>;
  if (!item.data) {
    return (
      <>
        <p className="empty">That item does not exist.</p>
        <p>
          <Link href="/">Back to content</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <p className="meta">
        <Link href="/">Back to content</Link>
      </p>
      <h1>Edit item</h1>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="body">Body</label>
      <textarea
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        onClick={() => save.mutate({ id: itemId, title, body })}
        disabled={save.isPending}
      >
        {save.isPending ? "Saving" : "Save changes"}
      </button>

      {save.isSuccess && <p className="meta">Saved.</p>}
    </>
  );
}

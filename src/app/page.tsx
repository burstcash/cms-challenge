"use client";

import Link from "next/link";
import { useState } from "react";
import { trpc } from "@/trpc/client";

export default function ItemListPage() {
  const utils = trpc.useUtils();
  const items = trpc.list.useQuery();
  const [title, setTitle] = useState("");

  const create = trpc.create.useMutation({
    onSuccess: () => {
      setTitle("");
      utils.list.invalidate();
    },
  });

  return (
    <>
      <h1>Content</h1>
      <p className="lede">
        Everything published on the site. Open an item to edit it.
      </p>

      {items.isPending && <p className="meta">Loading content.</p>}

      {items.data?.length === 0 && (
        <p className="empty">No content yet. Add your first item below.</p>
      )}

      {items.data && items.data.length > 0 && (
        <ul className="items">
          {items.data.map((item) => (
            <li key={item.id}>
              <div className="row">
                <Link href={`/items/${item.id}`}>{item.title}</Link>
                <span className="meta">
                  Edited {item.updatedAt.toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2>Add an item</h2>
      <label htmlFor="new-title">Title</label>
      <input
        id="new-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Autumn hours"
      />
      <button
        onClick={() => create.mutate({ title, body: "" })}
        disabled={!title.trim() || create.isPending}
      >
        {create.isPending ? "Adding" : "Add item"}
      </button>
    </>
  );
}

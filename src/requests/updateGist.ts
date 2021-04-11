import { BookmarkCollection } from "~/model/Bookmark"
import { createInstance } from "./setup"

interface Args {
  token: string
  gistId: string
  filename: string
  description: string
  bookmarks: BookmarkCollection
}

export function updateGist({
  token,
  gistId,
  filename,
  description,
  bookmarks,
}: Args) {
  const instance = createInstance(token)
  return instance.patch(`/gists/${gistId}`, {
    public: false,
    description,
    files: {
      [filename]: {
        content: JSON.stringify(bookmarks, null, 2),
      },
    },
  })
}

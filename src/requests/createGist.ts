import { BookmarkCollection } from "~/model/Bookmark"
import { createInstance } from "./setup"

interface Args {
  filename: string
  name: string
  bookmarks: BookmarkCollection
  token: string
}

export function createGist({ token, filename, name, bookmarks }: Args) {
  const instance = createInstance(token)
  return instance.post("/gists", {
    public: false,
    description: name,
    files: {
      [filename]: {
        content: JSON.stringify(bookmarks, null, 2),
      },
    },
  })
}

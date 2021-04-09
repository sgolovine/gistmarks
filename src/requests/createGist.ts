import axios from "axios"
import { BookmarkCollection } from "~/model/Bookmark"

interface Args {
  filename: string
  name: string
  bookmarks: BookmarkCollection
}

export function createGist({ filename, name, bookmarks }: Args) {
  return axios.post("/gists", {
    public: false,
    description: name,
    files: {
      [filename]: {
        content: JSON.stringify(bookmarks, null, 2),
      },
    },
  })
}

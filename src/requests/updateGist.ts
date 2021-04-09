import axios from "axios"
import { BookmarkCollection } from "~/model/Bookmark"

interface Args {
  gistId: string
  filename: string
  description: string
  bookmarks: BookmarkCollection
}

export function updateGist({ gistId, filename, description, bookmarks }: Args) {
  return axios.patch(`/gists/${gistId}`, {
    public: false,
    description,
    files: {
      [filename]: {
        content: JSON.stringify(bookmarks, null, 2),
      },
    },
  })
}

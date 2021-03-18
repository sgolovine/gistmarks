import { AxiosInstance } from "axios"
import { BookmarkCollection } from "~/model/Bookmark"

export function createGist(
  instance: AxiosInstance,
  filename: string,
  description: string,
  bookmarks: BookmarkCollection
) {
  return instance.post("/gists", {
    public: false,
    description,
    files: {
      [filename]: {
        content: JSON.stringify(bookmarks, null, 2),
      },
    },
  })
}

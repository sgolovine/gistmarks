import { AxiosInstance } from "axios"
import { BookmarkCollection } from "~/model/Bookmark"

interface Args {
  instance: AxiosInstance
  gistId: string
  filename: string
  description: string
  bookmarks: BookmarkCollection
}

export function updateGist({
  instance,
  gistId,
  filename,
  description,
  bookmarks,
}: Args) {
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

import { Bookmark } from "~/model/Bookmark"
import { generateUUID } from "./generateGuid"

export function createFakeBookmark(): Bookmark {
  const bookmark: Bookmark = {
    guid: generateUUID(),
    name: "Bookmark Name",
    href: "https://www.gistmarks.io",
    category: "Test Category",
    description: "This is a test description",
  }
  return bookmark
}

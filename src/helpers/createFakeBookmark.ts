import faker from "faker"
import { Bookmark } from "~/model/Bookmark"
import { generateUUID } from "./generateGuid"

export function createFakeBookmark(): Bookmark {
  const bookmark: Bookmark = {
    guid: generateUUID(),
    name: faker.lorem.words(),
    href: faker.internet.url(),
    category: faker.lorem.word(),
    description: faker.lorem.sentence(),
  }
  return bookmark
}

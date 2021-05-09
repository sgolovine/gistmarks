export type ActionTypes =
  | "SET_ALL_FIELDS"
  | "SET_GUID"
  | "SET_NAME"
  | "SET_HREF"
  | "SET_DESCRIPTION"
  | "SET_CATEGORY"
  | "RESET"

export interface IEditorContext {
  guid: string
  name: string
  href: string
  description: string
  category: string
  setAllFields: (state: EditorState) => void
  setGuid: (guid: string) => void
  setName: (name: string) => void
  setHref: (href: string) => void
  setDescription: (description: string) => void
  setCategory: (category: string) => void
  resetFields: () => void
}

export type EditorState = Pick<
  IEditorContext,
  "guid" | "name" | "href" | "description" | "category"
>

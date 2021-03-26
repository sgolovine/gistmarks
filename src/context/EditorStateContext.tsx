import React, { useReducer, createContext } from "react"
import { ContextProviderProps } from "~/model/Context"

type ActionTypes =
  | "SET_ALL_FIELDS"
  | "SET_GUID"
  | "SET_NAME"
  | "SET_HREF"
  | "SET_DESCRIPTION"
  | "SET_CATEGORY"

interface IEditorState {
  guid: string
  name: string
  href: string
  description: string
  category: string
}

interface IEditorActions {
  setAllFields: (state: IEditorState) => void
  setGuid: (guid: string) => void
  setName: (name: string) => void
  setHref: (href: string) => void
  setDescription: (description: string) => void
  setCategory: (category: string) => void
}

type EditorContext = IEditorState & IEditorActions

type Action = {
  type: ActionTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

const initialState: IEditorState = {
  guid: "",
  name: "",
  href: "",
  description: "",
  category: "",
}

export function reducer(
  state: IEditorState = initialState,
  action: Action
): IEditorState {
  switch (action.type) {
    case "SET_ALL_FIELDS":
      return {
        ...state,
        guid: action.payload.guid,
        name: action.payload.name,
        href: action.payload.href,
        description: action.payload.description,
        category: action.payload.category,
      }
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      }
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      }
    case "SET_GUID":
      return {
        ...state,
        guid: action.payload,
      }
    case "SET_HREF":
      return {
        ...state,
        href: action.payload,
      }
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}

export const EditorStateContext = createContext<EditorContext>(
  {} as EditorContext
)

export const EditorStateContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setAllFields = (state: IEditorState) => {
    dispatch({ type: "SET_ALL_FIELDS", payload: state })
  }

  const setGuid = (guid: string) => {
    dispatch({ type: "SET_GUID", payload: guid })
  }

  const setName = (name: string) => {
    dispatch({ type: "SET_NAME", payload: name })
  }

  const setHref = (href: string) => {
    dispatch({ type: "SET_HREF", payload: href })
  }

  const setDescription = (description: string) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description })
  }

  const setCategory = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category })
  }

  const value: EditorContext = {
    ...state,
    setAllFields,
    setGuid,
    setName,
    setHref,
    setDescription,
    setCategory,
  }

  return (
    <EditorStateContext.Provider value={value}>
      {children}
    </EditorStateContext.Provider>
  )
}

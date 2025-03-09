import React, { createContext, ReactNode, useReducer } from "react"
import { initialState, reducer } from "./reducer"
import { EditorState, IEditorContext } from "./types"

export const EditorStateContext = createContext<IEditorContext>(
  {} as IEditorContext,
)

export const EditorStateContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setAllFields = (state: EditorState) => {
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

  const resetFields = () => {
    dispatch({ type: "RESET", payload: null })
  }

  const value: IEditorContext = {
    ...state,
    resetFields,
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

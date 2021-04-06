import React, { useState } from "react"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"

type AT = "FOO" | "BAR"

type State = {
  fooVal: string
  barVal: string
}

type Action = {
  type: AT
  payload: any
}

const initialState: State = {
  fooVal: "",
  barVal: "",
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "BAR":
      return {
        ...state,
        barVal: action.payload,
      }
    case "FOO":
      return {
        ...state,
        fooVal: action.payload,
      }
    default:
      return state
  }
}

export const DevRoute = () => {
  const { state, dispatch } = usePersistedReducer<State, Action>(
    reducer,
    initialState,
    "DEV_STORAGE_KEY"
  )

  const [val, setVal] = useState<string>("")

  return (
    <div>
      <h1>Dev Route</h1>
      <input value={val} onChange={(e) => setVal(e.target.value)} />
      <hr />
      <button onClick={() => dispatch({ type: "FOO", payload: val })}>
        Dispatch SetFoo
      </button>
      <button onClick={() => dispatch({ type: "BAR", payload: val })}>
        Dispatch SetBar
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

import { useEffect, useReducer } from "react"
import deepEqual from "fast-deep-equal/es6"
import { usePrevious } from "./usePrevious"

export function usePersistedReducer<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  storageKey: string
) {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const prevState = usePrevious(state)

  function init(): State {
    const stringState = localStorage.getItem(storageKey)
    if (stringState) {
      try {
        return JSON.parse(stringState)
      } catch (error) {
        return initialState
      }
    } else {
      return initialState
    }
  }

  useEffect(() => {
    const stateEqual = deepEqual(prevState, state)
    if (!stateEqual) {
      const stringifiedState = JSON.stringify(state)
      localStorage.setItem(storageKey, stringifiedState)
    }
  }, [state])

  return { state, dispatch }
}

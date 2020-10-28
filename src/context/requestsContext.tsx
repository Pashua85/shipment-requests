import React, {useReducer, createContext, ReactNode, Dispatch} from 'react';

export interface IRequest {
  requestNumber: number,
  id: string,
  applyTime: number,
  clientFirm: string,
  transporter: string,
  transporterPhone: string,
  comments: string,
  codeATI: string
}

type Action =
  | {type: `SET_REQUESTS`, payload: IRequest[]}

type RequestsContextType = {
  state: {
    requests: IRequest[]
  },
  dispatch: Dispatch<Action>
}

type Props = {
  children: ReactNode
}

type IState = {
  requests: IRequest[]
}

const initialState = {
  state: {
    requests: []
  },
  dispatch: () => null
}

export const RequestsContext = createContext<RequestsContextType>(initialState);

const reducer = (state: IState, action: Action) => {
  switch(action.type) {
    case `SET_REQUESTS`: {
      return {
        requests: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const RequestsContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, {requests: []})

  return (
    <RequestsContext.Provider value={{state, dispatch}}>
      {props.children}
    </RequestsContext.Provider>
  )
}



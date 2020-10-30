import React, {useReducer, createContext, ReactNode, Dispatch} from 'react';

export interface IRequest {
  requestNumber: number,
  id: string,
  applyTime: string,
  clientFirm: string,
  transporter: string,
  transporterPhone: string,
  comments: string,
  codeATI: string
}

type Action =
  | {type: `SET_REQUESTS`, payload: IRequest[]}
  | {type: `ADD_REQUEST`, payload: IRequest}
  | {type: `CHANGE_REQUEST`, payload: IRequest}
  | {type: `DELETE_REQUEST`, payload: string}

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
    case `ADD_REQUEST`: {
      return {
        requests: [...state.requests, action.payload]
      }
    }
    case `CHANGE_REQUEST`: {
      return {
        requests: [...state.requests].map(r => {
          if (r.id === action.payload.id) {
            return action.payload;
          } else {
            return r;
          }
        })
      }
    }
    case `DELETE_REQUEST`: {
      return {
        requests: [...state.requests].filter(r => r.id !== action.payload)
      }
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



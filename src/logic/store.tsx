import React, {createContext, Dispatch, FC, Reducer, useContext, useReducer} from "react"
import {WidgetActionCreatorsType, WidgetState} from "@/logic/widgetReducer";

const WidgetStore = createContext<[state: WidgetState, dispatch: Dispatch<WidgetActionCreatorsType>]>(null)
WidgetStore.displayName = "WidgetStore"

export const useWidgetStore = () => useContext(WidgetStore)

interface Props {
    initialState: WidgetState;
    reducer: Reducer<WidgetState, WidgetActionCreatorsType>;
}

export const WidgetStoreProvider: FC<Props> = ({children, reducer, initialState}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <WidgetStore.Provider value={[state, dispatch]}>
        {children}
    </WidgetStore.Provider>
}
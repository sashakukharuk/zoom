import React, {useReducer} from "react";
import {authState} from "./StateAuth";
import {preloaderAuth} from "./ReducerAuth";
import {actionAuth} from "./ActionsAuth";
import {requestAuth} from "../../Request/auth";
import {AuthType, InitialAuthType} from "../../Types/AuthType";
import {EventEmitter} from "@umijs/hooks/lib/useEventEmitter";
import {useHistory} from "react-router-dom";


export const AuthContext = React.createContext<InitialAuthType>({} as InitialAuthType)

type PropsType = {
    children: any
    token$: EventEmitter<string>
}

export const AuthProvider = ({token$, children}: PropsType) => {

    const [state, dispatch] = useReducer(preloaderAuth, authState)
    const history = useHistory()
    const loginIn = async (form: AuthType) => {
        try {
            dispatch(actionAuth.setDisabled(true))

            const data = await requestAuth.postLogin(form)

            localStorage.setItem('access-token', data.accessToken)
            localStorage.setItem('refresh-token', data.refreshToken)
            history.push("/")
            token$.emit(data.accessToken)
            dispatch(actionAuth.setDisabled(false))

        } catch (e) {
            console.log(e)
            dispatch(actionAuth.setDisabled(false))
        }
    }

    const value = {
        email: state.email,
        password: state.password,
        disabled: state.disabled,
        loginIn
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

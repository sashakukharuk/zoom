import React, {useEffect, useReducer} from "react";
import {userState} from "./StateUser";
import {preloaderUser} from "./ReducerUser";
import {InitialUserType} from "../../Types/UserType";
import {EventEmitter} from "@umijs/hooks/lib/useEventEmitter";
import {requestUser} from "../../Request/user";
import {actionUser} from "./ActionsUser";
import {requestAuth} from "../../Request/auth";

export const UserContext = React.createContext<InitialUserType>({} as InitialUserType)

type PropsType = {
    token$: EventEmitter<string>
    children: any
}

export const UserProvider = ({token$, children}: PropsType) => {
    const [state, dispatch] = useReducer(preloaderUser, userState)

    useEffect(() => {
        initialUser()
    }, [])


    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh-token')
            if (refreshToken) {
                const data = await requestAuth.refreshToken(refreshToken)
                localStorage.setItem('access-token', data.accessToken)
                localStorage.setItem('refresh-token', data.refreshToken)
                await initialUser()
            } else {
                token$.emit('')
            }
        } catch (e) {
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            return token$.emit('')
        }
    }

    const initialUser = async (): Promise<void> => {
        try {
            const token = localStorage.getItem('access-token')
            if (token) {
                const data = await requestUser.getUser(token)
                dispatch(actionUser.setUser(data))
            } else {
                await refreshToken()
            }
        } catch (e) {
            if (e.response.status === 401 || e.response.data.message === 'Unauthorized') await refreshToken()
            if (e.response.status === 400 || 404) {
                localStorage.removeItem('access-token')
                localStorage.removeItem('refresh-token')
                token$.emit('')
            }
        }
    }

    const value = {
        firstName: state.user.firstName,
        email: state.user.email,
        role: state.user.role
    }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

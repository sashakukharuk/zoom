import {InferActionsTypes} from "../../Types/InferActionsType";
import {UserType} from "../../Types/UserType";

export const USER_SET_USER = 'USER_SET_USER'

export const actionUser = {
    setUser: (user: UserType) => ({type: USER_SET_USER, user} as const),
}

export type ActionsUserType = InferActionsTypes<typeof actionUser>

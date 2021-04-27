import {InferActionsTypes} from "../../Types/InferActionsType";

export const AUTH_SET_DISABLED = 'AUTH_SET_DISABLED'

export const actionAuth = {
    setDisabled: (isDisabled: boolean) => ({type: AUTH_SET_DISABLED, isDisabled} as const),
}

export type ActionAuthType = InferActionsTypes<typeof actionAuth>

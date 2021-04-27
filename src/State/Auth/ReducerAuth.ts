import {AuthStateType} from "./StateAuth";
import {
    ActionAuthType,
    AUTH_SET_DISABLED
} from "./ActionsAuth";


export const preloaderAuth = (state: AuthStateType, action: ActionAuthType) => {
    switch (action.type) {
        case AUTH_SET_DISABLED: {
            return {...state, disabled: action.isDisabled}
        }

        default: return state
    }
}

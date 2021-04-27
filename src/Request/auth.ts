import {instance} from "./istance";
import {AuthType, TokensType} from "../Types/AuthType";

export const requestAuth = {
    postLogin (auth: AuthType) {
        return instance.post<TokensType>('api/auth/login', auth).then(res => res.data);
    },
    refreshToken (refreshToken: string) {
        return instance.post<TokensType>('api/auth/refresh-tokens', {refreshToken}).then(res => res.data);
    }
}

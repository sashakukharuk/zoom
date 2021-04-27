import {instance} from "./istance";
import {UserType} from "../Types/UserType";

export const requestUser = {
    getUser (token: string) {
        return instance.get<UserType>('api/user', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data);
    }
}

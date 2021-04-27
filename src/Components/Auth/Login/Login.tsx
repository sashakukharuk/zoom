import React, {useContext} from 'react'
import {AuthContext} from "../../../State/Auth/AuthProvider";
import {FormControl} from "../../Component/Form/Form";

export const Login = () => {
    const {email, password, disabled, loginIn} = useContext(AuthContext)

    return <div style={{paddingTop: '100px'}}>
        <FormControl
            name={'Login'}
            btnName={'Login'}
            args={[email, password]}
            disabled={disabled}
            sendForm={loginIn}
        />
    </div>
}

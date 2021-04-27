export const authState = {
    email: {id: 'email', type: 'email', name: 'email', value: '', label: 'Email', require: true, min: null, max: null, autoComplete: 'on'},
    password: {id: 'password', type: 'password', name: 'password', value: '', label: 'Пароль', require: true, min: 3, max: 30, autoComplete: 'off'},
    disabled: false
}
export type AuthStateType = typeof authState

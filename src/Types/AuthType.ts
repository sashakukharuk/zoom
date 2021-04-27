export type AuthType = {
    id?: string;
    email: string
    password: string
}

export type TokensType = {
    accessToken: string
    refreshToken: string
}

export type InitialAuthType = {
    email: FormItemType
    password: FormItemType
    disabled: boolean
    loginIn: (form: AuthType) => void
}

export type FormItemType = {
    id: string
    type: string
    name: string
    value: string
    require: boolean
    label: string
    min?: number | null | undefined
    max?: number | null | undefined
    autoComplete: string
}

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U: never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesTypes<T>>

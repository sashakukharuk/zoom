import React from "react";
import {FormikValues, useField} from "formik";
import {FieldMetaProps} from "formik/dist/types";
import {FormItemType} from "../../../Types/AuthType";
import { Input } from 'antd';

export const onValidate = (value: FormikValues, item: FormItemType) => {
    if (!value) {
        return `Required`
    }

    if (item.min) {
        if (value.length < item.min) {
            return `Invalid ${item.min}`
        }
    }

    if (item.max) {
        if (value.length > item.max) {
            return `Invalid ${item.max}`
        }
    }

    if (item.name === 'email') {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value as unknown as string)) {
            return 'Invalid email address';
        }
    }
}

type MyTextInputType = {
    item: FormItemType
}

type ControlFieldType = {
    item: FormItemType,
    meta: FieldMetaProps<any>,
    children: JSX.Element
}

export const MyTextInput = React.memo(({item}: MyTextInputType) => {
    const [field, meta] = useField({name: item.name, validate: (value: FormikValues) => onValidate(value, item)})
    return <ControlField item={item} meta={meta}>
        <Input style={{"margin": "22px 0"}}  type={item.type} {...field}/>
    </ControlField>
})

const ControlField = React.memo<ControlFieldType>(({item, meta, children}) => {
    return <div style={{textAlign:"left"}}>
        <label htmlFor={item.name}>{item.label}</label>
        {children}
        {meta.touched && meta.error && (<span style={{
            position: "absolute",
            right: "50%",
            transform: "translate(50%, 270%)",
            color: "red"
        }}>{meta.error}</span>)}
    </div>
})

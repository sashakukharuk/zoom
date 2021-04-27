import React from 'react'
import {Form, Formik} from "formik";
import {MyTextInput} from "./MyTextInput";
import {FormItemType} from "../../../Types/AuthType";
import {Button} from "antd";
import {Card} from 'antd';

type PropsType = {
    name: string
    btnName?: string
    args: FormItemType[]
    disabled: boolean
    sendForm: (form: any) => void
}

export const FormControl = ({name, btnName, args, disabled, sendForm}: PropsType) => {
    const object = args.reduce((acm, item) => {
        // @ts-ignore
        acm[item.name] = item.value
        return acm
    }, {})

    return <Formik
        initialValues={object}
        onSubmit={sendForm}
    >
        {() => (
            <Form>
                <div style={{"width": "500px", "margin": "auto"}}>
                    <div className="site-card-wrapper">
                        <Card title={name} bordered={true}>
                            {args.map(item => <MyTextInput key={item.id} item={item}/>)}
                            <div style={{textAlign:"right"}}>
                                <Button htmlType="submit" disabled={disabled} type="primary">{btnName}</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
}

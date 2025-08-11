import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { useEffect } from 'react';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const TheatreForm = ({ onAdd, onEdit, formState, selectedTheatre }) => {
    const [form] = Form.useForm();
    

    // prefilling the form when clicked on edit
    useEffect(() => {
        if (formState === "edit" && selectedTheatre) {
            form.setFieldsValue({
                ...selectedTheatre,
                isActive: selectedTheatre.isActive ? "true" : "false" // convert boolean to string for select
            });
        }
        else {
            form.resetFields();
        }
    }, [formState, selectedTheatre, form]);


    const handleformsubmission = (values) => {
        const formattedData = {
            ...values,
            isActive: values.isActive === "true" // convert string to boolean
        }

        if (formState === "add" && onAdd){
            onAdd(formattedData)
        }
        else if (formState === "edit" && onEdit){
            onEdit(formattedData)
        }
  };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Form
            {...layout}
            form={form}
            name={formState === "edit" ? "Edit Theatre Details" : "Add Theatre Details"}
            onFinish={handleformsubmission}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="_id" label="_id" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
    // space component from antD creates a constant space between the inline components 
    // ...layout and ...taillayout spread operator spreads the properties of the object as individual props
};
export default TheatreForm;
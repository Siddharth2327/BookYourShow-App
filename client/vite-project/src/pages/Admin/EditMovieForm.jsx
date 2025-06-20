import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import dayjs from 'dayjs';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const MovieForm = ({ onFinish, movieData }) => {

    const [form] = Form.useForm();
    useEffect(() => {
        if (movieData) {
            form.setFieldsValue({
                _id:movieData._id,
                ...movieData,
                releaseDate: dayjs(movieData.releaseDate),
            });
        }
    },[movieData])
    const handleformsubmission = (values) => {
        if (onFinish) onFinish(values); // calling the function of the parent component from here
        form.resetFields(); // reset the fields
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            {...layout}
            form={form}
            name="Edit Movie"
            onFinish={handleformsubmission}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="_id" hidden>
                <Input/>
            </Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
                <Select
                    options={[
                        { label: "Action", value: "Action" },
                        { label: "Comedy", value: "Comedy" },
                        { label: "Drama", value: "Drama" },
                        { label: "Animation", value: "Animation" },
                        { label: "Romance", value: "Romance" },
                        { label: "Thriller", value: "Thriller" },
                        { label: "Crime", value: "Crime" },
                        { label: "Horror", value: "Horror" },
                        { label: "Scifi", value: "Scifi" }
                    ]}
                />
            </Form.Item>
            <Form.Item name="language" label="Language" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="releaseDate" label="Release Date" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="poster" label="Poster URL" rules={[{ required: true }]}>
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
export default MovieForm;
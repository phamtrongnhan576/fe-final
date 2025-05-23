"use client";

import React, { useCallback } from "react";
import { Modal, Form, Input, DatePicker, Select, Radio } from "antd";
import { FormInstance } from "antd/lib/form";
import dayjs from "dayjs";

interface AddUserFormValues {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthday: dayjs.Dayjs;
  gender: boolean;
  role: "ADMIN" | "USER";
}

interface AddUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: AddUserFormValues) => void;
  form: FormInstance<AddUserFormValues>;
}

const AddUserModal: React.FC<AddUserModalProps> = React.memo(
  ({ visible, onCancel, onSubmit, form }) => {
    const handleFinish = useCallback(
      (values: AddUserFormValues) => {
        onSubmit(values);
      },
      [onSubmit]
    );

    const handleOk = useCallback(() => {
      form.submit();
    }, [form]);

    return (
      <Modal
        title="Add New User"
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        okText="Add"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#fe6b6e",
            borderColor: "#fe6b6e",
          },
        }}
        destroyOnHidden={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            role: "USER",
            gender: true,
          }}
          onFinishFailed={(error) => {
            console.error("Form validation failed:", error);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter the password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  pattern: /^[0-9]{9,11}$/,
                  message: "Please enter a valid phone number (9-11 digits)",
                },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="birthday"
              label="Birthday"
              rules={[{ required: true, message: "Please select the birthday" }]}
            >
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select the role" }]}
            >
              <Select placeholder="Select role">
                <Select.Option value="ADMIN">ADMIN</Select.Option>
                <Select.Option value="USER">USER</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select the gender" }]}
          >
            <Radio.Group>
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default AddUserModal;

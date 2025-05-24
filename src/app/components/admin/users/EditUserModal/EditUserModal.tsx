"use client";

import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
import dayjs from "dayjs";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}

interface EditUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  form: FormInstance;
  selectedUser: User | null;
  avatarPreview: string | null;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = React.memo(
  ({ visible, onCancel, onSubmit, form, selectedUser, avatarPreview, onAvatarChange }) => {
    const handleFinish = useCallback(
      (values: any) => {
        onSubmit(values);
      },
      [onSubmit]
    );

    const handleOk = useCallback(() => {
      form.submit();
    }, [form]);

    // Set initial values when selectedUser changes
    useEffect(() => {
      if (selectedUser) {
        form.setFieldsValue({
          name: selectedUser.name,
          email: selectedUser.email,
          phone: selectedUser.phone,
          birthday: dayjs(selectedUser.birthday),
          gender: selectedUser.gender,
          role: selectedUser.role,
        });
      }
    }, [selectedUser, form]);

    return (
      <Modal
        title="Edit User"
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
          },
        }}
        destroyOnHidden={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={(error) => {
            console.error("Form validation failed:", error);
          }}
        >
          <Form.Item label="Avatar">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#fe6b6e] text-white flex items-center justify-center text-2xl font-semibold border-2 border-gray-300 shadow-sm">
                    {selectedUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white mt-2 py-2 rounded-md cursor-pointer transition-all font-semibold w-44 text-center opacity-50">
                  <UploadOutlined />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                    onChange={onAvatarChange}
                    hidden
                  />
                </label>
              </div>
            </div>
          </Form.Item>

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
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Leave blank to keep current password" />
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

export default EditUserModal;

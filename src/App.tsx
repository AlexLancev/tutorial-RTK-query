import { FC, useCallback, useState } from "react";
import { Form, message } from "antd";

import { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } from "./redux";
import { AddRecordValues, DataType } from "./types";

import { TableComponent } from "./components/TableComponent";
import { AddRecordModal } from "./components/AddRecordModal";

export const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data = [] } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [form] = Form.useForm();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAdd = async (values: AddRecordValues) => {
    const newUser: DataType = {
      key: (data.length + 1).toString(),
      name: values.name,
      age: values.age,
      address: values.address,
    };

    try {
      await addUser(newUser).unwrap();
      form.resetFields();
      setIsModalOpen(false);
      message.success("Пользователь успешно добавлен!");
    } catch (error) {
      console.error("Failed to add user:", error);
      message.error("Не удалось добавить пользователя!");
    }
  };

  const handleDelete = async (key: string) => {
    await deleteUser(key).unwrap();
  }

  return (
    <>
      <TableComponent dataSource={data} onShowModal={showModal} onDelete={handleDelete} />
      <AddRecordModal form={form} onAdd={handleAdd} isModalOpen={isModalOpen} />
    </>
  );
};

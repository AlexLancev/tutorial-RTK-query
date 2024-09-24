import { FC, useCallback, useState } from "react";
import { Form, message } from "antd";
import { useUnit } from "effector-react";
import { v4 as uuidv4 } from "uuid";

import { $users, addUser, deleteUser, copyUser } from "./models/userStore";
import { AddRecordValues, DataType } from "./types";
import { TableComponent } from "./components/TableComponent";
import { AddRecordModal } from "./components/AddRecordModal";

export const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, addUserFn, deleteUserFn, copyUserFn] = useUnit([$users, addUser, deleteUser, copyUser]);
  const [form] = Form.useForm<AddRecordValues>();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAdd = useCallback((values: AddRecordValues) => {
    try {
      const newUser: DataType = {
        key: uuidv4(),
        name: values.name,
        age: values.age,
        address: values.address,
      };

      addUserFn(newUser);
      form.resetFields();
      setIsModalOpen(false);
      message.success("Пользователь успешно добавлен!");
    } catch (error) {
      message.error("Ошибка при добавлении пользователя!");
      console.error("Error adding user:", error);
    }
  }, [addUserFn, form]);

  const handleDelete = useCallback((key: string) => {
    try {
      deleteUserFn(key);
      message.success("Пользователь успешно удален!");
    } catch (error) {
      message.error("Ошибка при удалении пользователя!");
      console.error("Error deleting user:", error);
    }
  }, [deleteUserFn]);

  const handleCopy = useCallback((key: string) => {
    try {
      copyUserFn(key);
      message.success("Копия пользователя создана!");
    } catch (error) {
      message.error("Ошибка при копировании пользователя!");
      console.error("Error copying user:", error);
    }
  }, [copyUserFn]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setIsModalOpen(false);
  }, [form]);

  return (
    <>
      <TableComponent
        dataSource={users}
        onShowModal={showModal}
        onDelete={handleDelete}
        onCopy={handleCopy}
      />
      <AddRecordModal
        form={form}
        onAdd={handleAdd}
        onClose={handleCancel}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

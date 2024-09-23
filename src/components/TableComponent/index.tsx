import React from "react";
import { Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";

import { DataType } from "../../types";

interface TableComponentProps {
  dataSource: DataType[];
  onDelete: (key: string) => void;
  onShowModal: () => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({dataSource, onShowModal, onDelete}) => {
  const columns: ColumnsType<DataType> = [
    { title: "Имя", dataIndex: "name", key: "name" },
    { title: "Возраст", dataIndex: "age", key: "age" },
    { title: "Адрес", dataIndex: "address", key: "address" },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => onDelete(record.key)} danger>
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={onShowModal}>
        Добавить запись
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="key" />
    </div>
  );
};
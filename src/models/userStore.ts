import { createEvent, createStore } from "effector";
import persist from "effector-localstorage";
import { v4 as uuidv4 } from "uuid";

import { DataType } from "../types";

export const addUser = createEvent<DataType>();
export const deleteUser = createEvent<string>();
export const setUsers = createEvent<DataType[]>();
export const copyUser = createEvent<string>();

const initialUsers: DataType[] = [
  { key: "1", name: "Aleksei Vavulo", age: 36, address: "Russia" },
];

export const $users = createStore<DataType[]>(initialUsers)
  .on(setUsers, (_, users) => users)
  .on(addUser, (state, user) => [...state, user])
  .on(deleteUser, (state, key) => state.filter((user) => user.key !== key))
  .on(copyUser, (state, key) => {
    const userToCopy = state.find((user) => user.key === key);
    if (userToCopy) {
      const newUser = { ...userToCopy, key: uuidv4() };
      return [...state, newUser];
    }
    return state;
  });

persist({ store: $users, key: "users" });

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Todo from "../features/todos/TodoSlice";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get<(typeof Todo)[]>(
    "http:localhost:3001/todos"
  );
  return response.data;
});

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: Todo[] = [];
interface Todo {
  id: number;
  name: string;
  completed: boolean;
  important: boolean;
  urgent: boolean;
}

interface TodoArgs {
  taskName: string;
  urgent: boolean;
  important: boolean;
  completed?: boolean;
}
//Thunk pour ajouter une tache
// Todo c'est le type de retour , TodoArgs c'est le type des argements
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ taskName, urgent, important }: TodoArgs) => {
    const response = await axios.post<Todo>("http://localhost:3001/api/tasks", {
      name: taskName,
      urgent,
      important,
      completed: false,
    });
    console.log(response.data);
    return response.data;
  }
);

//Thunk pour update une tache
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    const response = await axios.put<Todo>(
      `http:localhost:3001/api/tasks/${todo.id}`
    );
    return response.data;
  }
);

//thunk pour get les datas
export const getDatas = createAsyncThunk("todos/getDatas", async () => {
  const response = await axios.get<Todo[]>("http://localhost:3001/api/tasks");
  return response.data;
});

//thunk pour update le check status
export const updateCheckStatus = createAsyncThunk(
  "todos/updateCheck",
  async ({ id, completed }: { id: number; completed: boolean }) => {
    const response = await axios.patch(
      `http://localhost:3001/api/tasks/${id}`,
      {
        completed,
      }
    );
    return response.data;
  }
);

// //thunk pour remove une table
// export const deleteTodo = createAsyncThunk(
//     "todos/removeTodo",
//     async(todo: Todo)=>{
//         const response = await axios.delete(`http:localhost/${todo.id}`)
//         return response.data
//     }
// )
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload); //ajouter une nouvelle action
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(getDatas.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateCheckStatus.fulfilled, (state, action) => {
        const updateCheck = action.payload;
        const index = state.findIndex((task) => task.id === updateCheck.id);
        if (index !== -1) {
          state[index] = updateCheck; //mettre a jour la tache dans l'etat global
        }
      });
  },
});

export const { toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

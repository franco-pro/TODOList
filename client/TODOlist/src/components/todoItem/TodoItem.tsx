/* eslint-disable @typescript-eslint/no-explicit-any */
import "react";
import "./todoItem.css";
import { AppDispatch, RootState } from "../../store";
import "./select.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  updateCheckStatus,
  updateTodo,
} from "../../features/todos/TodoSlice";
import { useState } from "react";
type props = {
  id: number;
  name: string;
  urgent: boolean;
  important: boolean;
  completed: boolean;
};

export const TodoList = () => {
  //on peut utiliser ce useEffet pour afficher recuperer les datas depuis le back. Mais pour afficher la nouvelle tache sans reflesh la page , on peut utiliser le useSelector. Deja qu'on utilise REDUX

  // const [datas, setDatas] = useState([]);
  // useEffect(() => {
  //   const fetchDatas = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/tasks");
  //       console.log(response.data);
  //       setDatas(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchDatas();
  // }, []);

  //Utilisation de useSelector
  const datas = useSelector((state: RootState) => state.todos);

  //pour changer le status du check dans la bd en utilisant l'action updateCheckStatus
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeCheckStatus = (id: number, completed: boolean) => {
    dispatch(updateCheckStatus({ id, completed: !completed })); //inverser la valeur du completed dans la bd
  };

  //fonction pour update une tache
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    urgent: false,
    important: false,
  });
  //gestion des changements dans le formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FormData envoyé :", formData);
    try {
      await dispatch(
        updateTodo({
          id: editingTaskId as number,
          updatedTask: {
            name: formData.name,
            urgent: formData.urgent,
            important: formData.important,
          },
        })
      ).unwrap();
      console.log("mise a jour reussie");
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setEditingTaskId(null);
    }
  };

  //fonction pour supprimer une tache
  const handleDeleteTask = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      {datas.map((data: props) => {
        return (
          <div className="todos" key={data.id}>
            {editingTaskId === data.id ? (
              <div className="containerEdit">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="urgent"
                    value={String(formData.urgent)}
                    onChange={handleChange}
                  >
                    <option value="true">Urgent</option>
                    <option value="false">Non Urgent</option>
                  </select>
                  <select
                    name="important"
                    value={String(formData.important)}
                    onChange={handleChange}
                  >
                    <option value="true">Important</option>
                    <option value="false">Non Important</option>
                  </select>
                  <button className="btn" type="submit">
                    Saurvegarder
                  </button>
                  <button
                    className="btn"
                    onClick={() => setEditingTaskId(null)}
                  >
                    Annuler
                  </button>
                </form>
              </div>
            ) : (
              <div className="containerTodo">
                <label>
                  <input
                    type="checkbox"
                    checked={data.completed}
                    onChange={() =>
                      handleChangeCheckStatus(data.id, data.completed)
                    }
                  />
                  {data.name}
                </label>
                <div className="importantUrgent">
                  {data.urgent ? <span>Urgent</span> : <span>Pas Urgent</span>}
                  {data.important ? (
                    <span>Important</span>
                  ) : (
                    <span>Pas Important</span>
                  )}
                </div>
                <div className="btns">
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteTask(data.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-update"
                    onClick={() => {
                      setEditingTaskId(data.id);
                      setFormData({
                        name: data.name,
                        urgent: data.urgent,
                        important: data.important,
                      });
                    }}
                  >
                    update
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import "react";
import "./todoItem.css";
import { AppDispatch, RootState } from "../../store";
import "./select.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckStatus } from "../../features/todos/TodoSlice";
type props = {
  name: string;
  urgent: boolean;
  important: boolean;
  completed: boolean;
  id: any;
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

  //pour changer le status du check dans la bd en utilisant l'acrion updateCheckStatus
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeCheckStatus = (id: number, completed: boolean) => {
    dispatch(updateCheckStatus({ id, completed: !completed })); //inverser la valeur du completed dans la bd
  };
  return (
    <>
      {datas.map((data: props) => {
        return (
          <div className="todos" key={data.id}>
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
              <div className="btns">update & delete</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

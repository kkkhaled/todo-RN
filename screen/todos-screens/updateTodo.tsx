import React from "react";
import TodoForm from "../../views/todoForm.view";
import showToast from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { editTodo } from "../../redux/todos/update-todo/editTodo.slice";

const UpdateTodoScreen = () => {
  // for handle add todo from api
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.edittodo);

  const handleSubmit = (data: {
    id: number;
    task: string;
    startedAt: Date;
    endedAt: Date;
  }) => {
    dispatch(
      editTodo({
        id: data.id,
        task: data.task,
        startedAt: data.startedAt,
        endedAt: data.endedAt,
      })
    );
    if (error) {
      console.log(error);
      showToast("something went wrong try again later !!!");
    } else {
      showToast("updated ....");
    }
  };

  return <TodoForm isEdit={true} handleBtnUpdateSubmit={handleSubmit} />;
};

export default UpdateTodoScreen;

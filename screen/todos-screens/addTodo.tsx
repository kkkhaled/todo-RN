import React from "react";
import TodoForm from "../../views/todoForm.view";
import showToast from "../../utils/toast";
import { createTodo } from "../../redux/todos/add-todo/addTodo.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

const AddTodoScreen = () => {
  // for handle add todo from api
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.addtodo);

  const handleSubmit = (data: {
    task: string;
    startedAt: Date;
    endedAt: Date;
  }) => {
    dispatch(
      createTodo({
        task: data.task,
        startedAt: data.startedAt,
        endedAt: data.endedAt,
      })
    );
    if (error) {
      showToast("something went wrong try again later !!!");
    } else {
      showToast("created ....");
    }
  };

  return <TodoForm isEdit={false} handleBtnSubmit={handleSubmit} />;
};

export default AddTodoScreen;

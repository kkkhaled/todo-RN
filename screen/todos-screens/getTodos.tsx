import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserTodos } from "../../redux/todos/get-todo/getTodo.slice";
import { deleteTodo } from "../../redux/todos/delete-todo/deleteTodo.slices";

import { AppDispatch, RootState } from "../../redux/store";
import TodoView from "../../views/todo.view";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import showToast from "../../utils/toast";
import LogoutButton from "../../views/logOutButton.view";

const AlltodoScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // state for get todos
  const { loading, todos } = useSelector((state: RootState) => state.getTodos);
  //state for delete todos
  const { error: DeleteError, loading: DeleteLoading } = useSelector(
    (state: RootState) => state.deleteTodo
  );

  const { loading: AddLoading } = useSelector(
    (state: RootState) => state.addtodo
  );
  const { loading: EditLoading } = useSelector(
    (state: RootState) => state.edittodo
  );

  useEffect(() => {
    dispatch(getUserTodos());
  }, [dispatch, DeleteLoading, AddLoading, EditLoading]);
  // handle delete todos
  const handleRemoveTodo = (id: number) => {
    dispatch(deleteTodo(id));
    if (DeleteError !== null) {
      showToast("something went wron while deleting this item");
    } else {
      showToast("deleted");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LogoutButton />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        todos.map((todo) => (
          <TodoView
            key={todo.id}
            todo={todo}
            onDelete={() => handleRemoveTodo(todo.id)}
          />
        ))
      )}
      {todos.length === 0 && (
        <TouchableOpacity
          style={styles.addTaskContainer}
          onPress={() => navigation.navigate("add-todo")}
        >
          <Text style={styles.addTaskText}>
            Click here to add your first task
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addTaskContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  addTaskText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default AlltodoScreen;

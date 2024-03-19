import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  startedAt: string;
  endedAt: string;
}

interface TodoViewProps {
  todo: Todo;
  onDelete?: (id: number) => void;
}

const TodoView: React.FC<TodoViewProps> = ({ todo, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const startedAtFormatted = dayjs(todo.startedAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  const endedAtFormatted = dayjs(todo.endedAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  return (
    <View style={styles.container}>
      <Text style={styles.task}>{todo.task}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.status}>
          {todo.completed ? "Completed" : "Not Completed"}
        </Text>
        <Text style={styles.info}>Started: {startedAtFormatted}</Text>
        <Text style={styles.info}>Ended: {endedAtFormatted}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => navigation.navigate("add-todo")}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => navigation.navigate("edit-todo", { todoId: todo.id })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => onDelete && onDelete(todo.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  task: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    marginBottom: 5,
    color: "#38598b",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnAdd: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnDelete: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default TodoView;

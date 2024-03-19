import React, { useState } from "react";
import { View, Button, TextInput, Platform, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";

interface TodoFormViewProps {
  isEdit: boolean;
  handleBtnSubmit?: (data: {
    task: string;
    startedAt: Date;
    endedAt: Date;
  }) => void;
  handleBtnUpdateSubmit?: (data: {
    id: number;
    task: string;
    startedAt: Date;
    endedAt: Date;
  }) => void;
}

// Define the interface for navigation params
interface EditTodoParams {
  todoId: number;
}

const TodoForm: React.FC<TodoFormViewProps> = ({
  isEdit,
  handleBtnSubmit,
  handleBtnUpdateSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const route = useRoute<RouteProp<ParamListBase, "edit-todo">>();

  const onChangeStartDate = (
    _event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onChangeEndDate = (
    _event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  const handleSubmit = () => {
    if (handleBtnSubmit) {
      if (!isEdit) {
        handleBtnSubmit({
          task: title,
          startedAt: startDate,
          endedAt: endDate,
        });
      }
    } else if (isEdit) {
      if (handleBtnUpdateSubmit) {
        const { todoId } = route.params as EditTodoParams;
        handleBtnUpdateSubmit({
          id: todoId,
          task: title,
          startedAt: startDate,
          endedAt: endDate,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.datePickersContainer}>
        <View style={styles.datePickerButton}>
          <Button
            onPress={showStartDatepicker}
            title="Select Start Date"
            color="#007bff"
          />
          {showStartDatePicker && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeStartDate}
            />
          )}
        </View>
        <View style={styles.datePickerButton}>
          <Button
            onPress={showEndDatepicker}
            title="Select End Date"
            color="#007bff"
          />
          {showEndDatePicker && (
            <DateTimePicker
              testID="endDateTimePicker"
              value={endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEndDate}
            />
          )}
        </View>
      </View>
      <Button onPress={handleSubmit} title="Submit" color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  datePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  datePickerButton: {
    flex: 1,
    marginRight: 10,
  },
});

export default TodoForm;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screen/auth-screens/login";
import SignUpScreen from "../screen/auth-screens/signup";
import AddTodoScreen from "../screen/todos-screens/addTodo";
import UpdateTodoScreen from "../screen/todos-screens/updateTodo";
import AlltodoScreen from "../screen/todos-screens/getTodos";
import { Provider } from "react-redux";
import store from "../redux/store";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="add-todo" component={AddTodoScreen} />
          <Stack.Screen name="edit-todo" component={UpdateTodoScreen} />
          <Stack.Screen name="get-todos" component={AlltodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;

import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { logout } from "../redux/auth/auth.slice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={style.btnLogout}>
      <Text
        style={{
          color: "white",
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btnLogout: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});
export default LogoutButton;

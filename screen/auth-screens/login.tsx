import React, { useEffect } from "react";
import AuthView from "../../views/auth.view";
import { login } from "../../redux/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import showToast from "../../utils/toast";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // for handle login from api
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  // useEffect to navigate after successful signup
  useEffect(() => {
    if (!loading && error === null) {
      navigation.navigate("get-todos");
    }
  }, [loading, error, navigation]);

  // Show error message if error occurs
  useEffect(() => {
    if (error !== null) {
      showToast("please enter valid username or password");
    }
  }, [error]);

  return (
    <AuthView
      isLogin={true}
      error={error}
      loading={loading}
      handleBtnSubmit={handleSubmit}
    />
  );
};

export default LoginScreen;

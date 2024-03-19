import React, { useEffect, useState } from "react";
import AuthView from "../../views/auth.view";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { signup } from "../../redux/auth/auth.slice";
import showToast from "../../utils/toast";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // for handle signup from api
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (email: string, password: string) => {
    dispatch(signup({ email, password }));
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
      showToast(error);
    }
  }, [error]);

  return (
    <AuthView
      isLogin={false}
      loading={loading}
      error={error}
      handleBtnSubmit={handleSubmit}
    />
  );
};

export default SignUpScreen;

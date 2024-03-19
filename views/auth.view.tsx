import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import showToast from "../utils/toast";

interface AuthSViewProps {
  isLogin: boolean;
  loading: boolean;
  error: string | null;
  handleBtnSubmit: (email: string, password: string) => void;
}

const AuthView: React.FC<AuthSViewProps> = ({
  isLogin,
  error,
  loading,
  handleBtnSubmit,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("AuthView mounted");
    return () => {
      console.log("AuthView unmounted");
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleSubmit = () => {
    // Check if email and password are not empty
    if (!email.trim() || !password.trim()) {
      showToast("Email and password cannot be empty");
      return;
    }
    // If fields are not empty, proceed with submitting the form
    handleBtnSubmit(email, password);
    // if (!error) {
    //   console.log(error, "iffff");
    //   navigation.navigate("get-todos");
    //   error = null;
    // } else {
    //   console.log(error, "else");
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? "Log in" : "Sign up"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(isLogin ? "SignUp" : "Login");
        }}
      >
        <Text style={styles.linkText}>
          {isLogin
            ? "Don't have an account? Sign up!"
            : "Already have an account? Log in!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    color: "#007bff",
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 20,
  },
});

export default AuthView;

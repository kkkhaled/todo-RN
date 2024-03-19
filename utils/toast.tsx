import { ToastAndroid } from "react-native";

const showToast = (message: string, duration: number = ToastAndroid.SHORT) => {
  ToastAndroid.show(message, duration);
};

export default showToast;

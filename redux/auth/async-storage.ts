import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: any) => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
    console.log("Token removed successfully");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

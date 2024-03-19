import { useSelector } from "react-redux";
import { ReactElement, useEffect } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootState } from "../redux/store";

const withGuard = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props): ReactElement => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const isLoggedIn: boolean = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    useEffect(() => {
      if (!isLoggedIn) {
        navigation.navigate("Login");
      }
    }, [isLoggedIn, navigation]);

    return isLoggedIn ? <Component {...(props as P)} /> : <></>;
  };

  return Wrapper;
};

export default withGuard;

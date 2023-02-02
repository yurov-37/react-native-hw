import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RegistrationScreen() {
  const [fontsLoaded] = useFonts({
    Roboto400: require("../../assets/fonts/Roboto-Regular.ttf"),
    Roboto500: require("../../assets/fonts/Roboto-Medium.ttf"),
    Roboto700: require("../../assets/fonts/Roboto-Bold.ttf"),
  });
  const [state, setState] = useState({
    login: "",
    email: "",
    password: "",
  });
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    // const onChange = () => {
    //   const width = Dimensions.get("window").width;
    //   console.log("width", width);
    // };
    // const changeDimension = Dimensions.addEventListener("change", onChange);

    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
      // changeDimension.remove();
    };
  }, []);

  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleInputFocus = (textinput) => {
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const registerSubmit = () => {
    console.log(state);
    setState({
      login: "",
      email: "",
      password: "",
    });
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.form} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.fotoBox}>
          <Image
            style={styles.addIcon}
            source={require("../../assets/icons/add.png")}
          />
        </View>
        <Text style={styles.title}>Регистрация</Text>
        <TextInput
          style={
            isFocused.login
              ? {
                  ...styles.input,
                  borderColor: "#FF6C00",
                  backgroundColor: "transparent",
                }
              : styles.input
          }
          placeholder="Логин"
          cursorColor={"orange"}
          value={state.login}
          maxLength={12}
          placeholderTextColor={"#BDBDBD"}
          marginBottom={16}
          onFocus={() => handleInputFocus("login")}
          onBlur={() => handleInputBlur("login")}
          onChangeText={(value) => {
            setState((prevState) => ({ ...prevState, login: value }));
          }}
        />
        <TextInput
          style={
            isFocused.email
              ? {
                  ...styles.input,
                  borderColor: "#FF6C00",
                  backgroundColor: "transparent",
                }
              : styles.input
          }
          placeholder="Адрес электронной почты"
          cursorColor={"orange"}
          placeholderTextColor={"#BDBDBD"}
          marginBottom={16}
          value={state.email}
          onFocus={() => handleInputFocus("email")}
          onBlur={() => handleInputBlur("email")}
          onChangeText={(value) => {
            setState((prevState) => ({ ...prevState, email: value }));
          }}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={
              isFocused.password
                ? {
                    ...styles.input,
                    borderColor: "#FF6C00",
                    backgroundColor: "transparent",
                  }
                : styles.input
            }
            placeholder="Пароль"
            secureTextEntry={hidePassword}
            cursorColor={"orange"}
            placeholderTextColor={"#BDBDBD"}
            marginBottom={isKeyboardVisible ? 0 : 43}
            value={state.password}
            onFocus={() => handleInputFocus("password")}
            onBlur={() => handleInputBlur("password")}
            onChangeText={(value) => {
              setState((prevState) => ({ ...prevState, password: value }));
            }}
          />
          <TouchableOpacity
            style={styles.showPasswordBtn}
            onPress={handleShowPassword}
          >
            <Text style={styles.showPasswordText}>
              {hidePassword ? "Показать" : "Скрыть"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={registerSubmit}
          >
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    // marginTop: "auto",
    position: "relative",
    paddingTop: 92,
    paddingBottom: 45,
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  fotoBox: {
    position: "absolute",
    top: -150,
    left: 118,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  title: {
    fontFamily: "Roboto500",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 32,
  },
  input: {
    fontFamily: "Roboto400",
    fontSize: 15,
    lineHeight: 19,
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    position: "relative",
  },

  button: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  showPasswordBtn: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 16,
    top: 23,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto400",
    fontSize: 15,
    lineHeight: 19,
  },
  buttonText: {
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

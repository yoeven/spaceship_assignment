import React from "react";
import { StatusBar, Platform } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as appMapping } from "./custom-mapping.json";
import { default as appTheme } from "./custom-theme.json";
import { SetUp } from "./processors/FireBaseManger";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import "./processors/Utils";
import GenericConfirmationModal from "./components/GenericConfirmationModal";

import NavigationService from "./NavigationService";

import Profile from "./pages/Profile";

import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";

import NoNetPage from "./pages/NoNetPage";

import EmailVerificationPage from "./pages/AuthPage/EmailVerificationPage";
import ForgetPasswordPage from "./pages/AuthPage/ForgetPasswordPage";

import * as Linking from "expo-linking";

import { unsubscribe } from "./processors/NetManagement";

import "./timerfix";

dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(isBetween);

enableScreens();
SetUp();

let AuthRequiredRoutes = ["Profile"];

const theme = { ...lightTheme, ...appTheme };

const prefix = Linking.makeUrl("/");

export default class App extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      Loading: true,
    };
  }
  componentDidMount() {
    if (Platform.OS == "android") {
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor("#FFF1F1");
    }

    Font.loadAsync({
      "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    }).then(() => {
      this.setState({ Loading: false });
    });
  }

  componentWillUnmount() {
    unsubscribe && unsubscribe();
  }

  render() {
    if (this.state.Loading) return null;
    return (
      <SafeAreaProvider>
        <React.Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={mapping} customMapping={appMapping} theme={theme}>
            <AppContainer
              uriPrefix={prefix}
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef, AuthRequiredRoutes);
              }}
            />
            <GenericConfirmationModal
              ref={ref => {
                NavigationService.setTopLevelAlert(ref);
              }}
            />
          </ApplicationProvider>
        </React.Fragment>
      </SafeAreaProvider>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    AuthPage: {
      screen: AuthPage,
    },
    LoginPage: {
      screen: LoginPage,
    },
    RegisterPage: {
      screen: RegisterPage,
    },
    EmailVerificationPage: {
      screen: EmailVerificationPage,
    },
    ForgetPasswordPage: {
      screen: ForgetPasswordPage,
    },
  },
  {
    headerMode: "none",
  }
);

// const MainStack = createStackNavigator(
//   {
//     Home: {
//       screen: Profile,
//     },
//   },
//   {
//     headerMode: "none",
//   }
// );

const CheckSwitch = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: Profile,
    NoNet: NoNetPage,
  },
  {
    initialRouteName: "Auth",
  }
);

const AppContainer = createAppContainer(CheckSwitch);

import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button } from "@ui-kitten/components";
import PageHeader from "../../components/PageHeader";
import * as firebase from "firebase/app";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaView from "react-native-safe-area-view";
import AuthBg from "../../assets/authbg.jpg";

export default class AuthPage extends React.PureComponent {
  state = {
    Loading: true,
  };

  componentDidMount() {
    this.AuthListener = firebase.auth().onAuthStateChanged(async user => {
      this.AuthListener && this.AuthListener();
      if (user && user.emailVerified) {
        this.props.navigation.navigate("App");
      } else {
        this.setState({ Loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.AuthListener && this.AuthListener();
  }

  render() {
    if (this.state.Loading) return null;
    return (
      <ImageBackground resizeMode="cover" source={AuthBg} style={{ flex: 1 }}>
        {/* <View style={{ width: wp(100), height: hp(100), position: "absolute", backgroundColor: "rgba(1,1,1,0.3)" }} /> */}
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent", "transparent", "transparent", "rgba(0,0,0,0.8)"]}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.Wrapper}>
            <View style={styles.ButtonWrappers}>
              <Button textStyle={{ letterSpacing: 0.3 }} onPress={() => this.props.navigation.navigate("LoginPage")}>
                Sign in with Email
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate("RegisterPage")}
                style={styles.RegisterButton}
                textStyle={{ color: "white", letterSpacing: 0.3 }}
                appearance="outline">
                New to Spaceship? Sign Up
              </Button>
              <TouchableWithoutFeedback onPress={() => {}}>
                <Text
                  style={{
                    textAlign: "center",
                    paddingTop: hp(2),
                    color: "white",
                    fontFamily: "roboto-regular",
                    lineHeight: hp(3),
                    letterSpacing: 0.2,
                    fontSize: wp(3.5),
                  }}>
                  By signing up, I agree to Spaceship's{"\n"}
                  <Text style={{ textDecorationLine: "underline", fontFamily: "roboto-regular" }}>
                    Terms of Service and Privacy Policy
                  </Text>
                </Text>
              </TouchableWithoutFeedback>
              {/* <Text style={styles.VersionStyle}>v{Constants.manifest.version}</Text> */}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: wp(3),
    flex: 1,
    justifyContent: "flex-end",
  },
  TitleWrapper: {
    paddingTop: hp(2),
  },
  Title: {
    fontFamily: "roboto-bold",
    fontSize: wp(9.5),
    textAlign: "left",
    paddingBottom: hp(3),
    color: "white",
  },
  ButtonWrappers: {
    paddingBottom: Platform.OS == "android" ? hp(3) : hp(2),
  },
  RegisterButton: {
    marginTop: hp(2),
    borderColor: "white",
  },
  VersionStyle: {
    textAlign: "center",
    paddingTop: hp(1),
    color: "white",
    fontFamily: "roboto-regular",
    fontSize: wp(3),
  },
});

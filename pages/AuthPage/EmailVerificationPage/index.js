import React from "react";
import { Text, StyleSheet, Linking } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button } from "@ui-kitten/components";
import MailSvg from "../../../assets/graphics/mail.svg";
import SafeAreaView from "react-native-safe-area-view";

export default class EmailVerificationPage extends React.PureComponent {
  state = {
    ShowLogin: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ShowLogin: true });
    }, 5 * 1000);
  }

  render() {
    const Email = this.props.navigation.getParam("Email");
    return (
      <SafeAreaView style={styles.Wrapper}>
        <Text style={styles.AlertTitle}>Email Verification Sent</Text>
        <MailSvg width={"100%"} height={hp(25)} />
        <Text style={styles.AlertMessage}>
          Please verify your email by clicking on the verification link at {Email}
        </Text>
        {Email && (
          <Button
            appearance="outline"
            style={styles.TopButton}
            onPress={() => Linking.openURL("https://www." + Email.split("@")[1])}>
            Open Email
          </Button>
        )}

        <Button style={{ marginTop: hp(2) }} onPress={() => this.props.navigation.navigate("LoginPage")}>
          Login
        </Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp(5),
  },
  HeaderButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: wp(2),
    paddingTop: hp(1),
  },
  AlertTitle: {
    fontFamily: "roboto-bold",
    fontSize: wp(8),
    textAlign: "center",
    marginBottom: hp(8),
  },
  AlertMessage: {
    fontFamily: "roboto-regular",
    fontSize: wp(5),
    textAlign: "center",
    marginTop: hp(5),
    marginHorizontal: wp(3),
  },
  TopButton: {
    marginTop: hp(8),
  },
});

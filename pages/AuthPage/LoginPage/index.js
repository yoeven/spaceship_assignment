import React from "react";
import * as firebase from "firebase/app";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Input, Icon } from "@ui-kitten/components";
import PageHeader from "../../../components/PageHeader";
import LoadingButton from "../../../components/LoadingButton";
import SafeAreaView from "react-native-safe-area-view";

let InitalValues = {
  email: "",
  password: "",
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export default class LoginPage extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      SecureTextEntry: true,
    };
  }

  async Login(values, setSubmitting) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);

      if (user != null) {
        if (user.user.emailVerified) {
          this.props.navigation.navigate("App");
        } else {
          await user.user.sendEmailVerification();
          await firebase.auth().signOut();
          setSubmitting(false);
          this.props.navigation.navigate("EmailVerificationPage", { Email: user.user.email });
        }
      }
    } catch (error) {
      console.log(error);
      const user = firebase.auth().currentUser;
      await firebase.auth().signOut();
      setSubmitting(false);
      if (error.message == "We have blocked all requests from this device due to unusual activity. Try again later.") {
        const email = user ? user.email : null;
        this.props.navigation.navigate("EmailVerificationPage", { Email: email });
      } else {
        Alert.alert(
          "Error",
          error.message,
          [
            {
              text: "Okay",
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <PageHeader ShowRightIcon={false} />
          <Formik
            initialValues={InitalValues}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting }) => this.Login(values, setSubmitting)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating, isSubmitting }) => (
              <View style={styles.FormWrapper}>
                <Text style={styles.Title}>Sign In</Text>
                <View style={styles.SectionWrapper}>
                  <Input
                    status={errors.email && touched.email ? "danger" : "basic"}
                    placeholder="Email"
                    size="large"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={styles.InputSpacing}
                    onSubmitEditing={() => {
                      this.PasswordInput.focus();
                    }}
                    blurOnSubmit={false}
                    caption={touched.email && errors.email}
                    autoCompleteType={"email"}
                    keyboardType={"email-address"}
                    returnKeyType="next"
                    textContentType="username"
                    autoCapitalize="none"
                  />
                  <Input
                    ref={ref => (this.PasswordInput = ref)}
                    status={errors.password && touched.password ? "danger" : "basic"}
                    placeholder="Password"
                    size="large"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={this.state.SecureTextEntry}
                    onIconPress={() => this.setState({ SecureTextEntry: !this.state.SecureTextEntry })}
                    icon={style => <Icon {...style} name={this.state.SecureTextEntry ? "eye-off" : "eye"} />}
                    caption={touched.password && errors.password}
                    autoCompleteType={"password"}
                    textContentType="password"
                    autoCapitalize="none"
                  />
                </View>

                <LoadingButton
                  textStyle={{ letterSpacing: 0.5 }}
                  isLoading={isSubmitting}
                  disabled={isValidating || isSubmitting}
                  onPress={handleSubmit}>
                  Sign In
                </LoadingButton>

                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ForgetPasswordPage")}>
                  <Text style={styles.ForgetPasswordText}>Forget Password</Text>
                </TouchableWithoutFeedback>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  FormWrapper: {
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  Title: {
    fontFamily: "roboto-bold",
    fontSize: wp(10),
    paddingBottom: hp(3),
    color: "#32C5FF",
  },
  SectionWrapper: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: hp(5),
  },
  InputSpacing: {
    marginBottom: hp(3),
  },
  ForgetPasswordText: {
    textAlign: "center",
    paddingTop: hp(3),
    fontFamily: "roboto-regular",
    fontSize: wp(4),
    letterSpacing: 0.3,
    color: "#777",
  },
});

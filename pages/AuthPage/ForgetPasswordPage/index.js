import React from "react";
import * as firebase from "firebase/app";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { StyleSheet, Text, View, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Input } from "@ui-kitten/components";
import PageHeader from "../../../components/PageHeader";
import LoadingButton from "../../../components/LoadingButton";
import SafeAreaView from "react-native-safe-area-view";

let InitalValues = {
  email: "",
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Required"),
});

export default class ForgetPasswordPage extends React.PureComponent {
  async ForgetPassword(values, setSubmitting) {
    try {
      await firebase.auth().sendPasswordResetEmail(values.email);
      Alert.alert(
        "Password reset email sent",
        "Please check " + values.email + " to reset your password",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.goBack(),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      Alert.alert(
        "Error",
        error.message,
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
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
            onSubmit={(values, { setSubmitting }) => this.ForgetPassword(values, setSubmitting)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating, isSubmitting }) => (
              <View style={styles.FormWrapper}>
                <Text style={styles.Title}>Forget Password</Text>

                <View style={styles.SectionWrapper}>
                  <Input
                    status={errors.email && touched.email ? "danger" : "basic"}
                    placeholder="Email"
                    size="large"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    caption={touched.email && errors.email}
                    autoCompleteType={"email"}
                    keyboardType={"email-address"}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                  />
                </View>
                <LoadingButton isLoading={isSubmitting} disabled={isValidating || isSubmitting} onPress={handleSubmit}>
                  Reset Password
                </LoadingButton>
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
    color: "#f34e5c",
  },
  SectionWrapper: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: hp(5),
  },
});

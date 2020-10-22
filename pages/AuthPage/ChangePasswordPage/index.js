import React from "react";
import * as firebase from "firebase/app";
import { GetCurrentUser } from "../../../processors/FireBaseManger";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { StyleSheet, Text, View, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Input, Icon } from "@ui-kitten/components";
import PageHeader from "../../../components/PageHeader";
import NavigationService from "../../../NavigationService";
import LoadingButton from "../../../components/LoadingButton";
import SafeAreaView from "react-native-safe-area-view";

let InitalValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  password: Yup.string()
    .notOneOf([Yup.ref("oldPassword"), null], "New password is same as the old password")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default class ChangePasswordPage extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      SecureTextEntry: true,
    };
  }

  async UpdatePassword(values, setSubmitting) {
    let email = GetCurrentUser().email;

    try {
      //resign in user as part of firebase policy to change password
      const user = await firebase.auth().signInWithEmailAndPassword(email, values.oldPassword);

      if (user != null) {
        //update to new password
        await user.user.updatePassword(values.password);

        Alert.alert(
          "Password Changed",
          "Password changed successfully",
          [{ text: "OK", onPress: () => NavigationService.goBack() }],
          {
            cancelable: false,
          }
        );
      }
    } catch (error) {
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
            onSubmit={(values, { setSubmitting }) => this.UpdatePassword(values, setSubmitting)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating, isSubmitting }) => (
              <View style={styles.FormWrapper}>
                <Text style={styles.Title}>Change Password</Text>
                <View style={styles.SectionWrapper}>
                  <Input
                    status={errors.oldPassword && touched.oldPassword ? "danger" : "basic"}
                    placeholder="Current Password"
                    size="large"
                    onChangeText={handleChange("oldPassword")}
                    onBlur={handleBlur("oldPassword")}
                    value={values.oldPassword}
                    secureTextEntry={this.state.SecureTextEntry}
                    style={styles.InputSpacing}
                    onSubmitEditing={() => {
                      this.PasswordInput.focus();
                    }}
                    blurOnSubmit={false}
                    caption={touched.oldPassword && errors.oldPassword}
                    returnKeyType="next"
                    textContentType="password"
                    autoCapitalize="none"
                  />
                  <Input
                    ref={ref => (this.PasswordInput = ref)}
                    status={errors.password && touched.password ? "danger" : "basic"}
                    placeholder="New Password"
                    size="large"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={this.state.SecureTextEntry}
                    style={styles.InputSpacing}
                    onSubmitEditing={() => {
                      this.ConfirmPasswordInput.focus();
                    }}
                    blurOnSubmit={false}
                    caption={touched.password && errors.password}
                    returnKeyType="next"
                    textContentType="newPassword"
                    autoCapitalize="none"
                  />
                  <Input
                    ref={ref => (this.ConfirmPasswordInput = ref)}
                    status={errors.confirmPassword && touched.confirmPassword ? "danger" : "basic"}
                    placeholder="Re-type New Password"
                    size="large"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={this.state.SecureTextEntry}
                    onIconPress={() => this.setState({ SecureTextEntry: !this.state.SecureTextEntry })}
                    icon={style => <Icon {...style} name={this.state.SecureTextEntry ? "eye-off" : "eye"} />}
                    caption={touched.confirmPassword && errors.confirmPassword}
                    autoCapitalize="none"
                  />
                </View>

                <LoadingButton isLoading={isSubmitting} disabled={isValidating || isSubmitting} onPress={handleSubmit}>
                  Update
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
  SectionWrapper: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: hp(5),
  },
  Title: {
    fontFamily: "roboto-bold",
    fontSize: wp(10),
    paddingBottom: hp(3),
    color: "#f34e5c",
  },
  InputSpacing: {
    marginBottom: hp(2),
  },
});

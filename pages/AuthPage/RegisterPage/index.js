import React from "react";
import * as firebase from "firebase/app";
import { GetDB, GetFunctions } from "../../../processors/FireBaseManger";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet, Text, View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Input, Icon, Datepicker, CalendarViewModes } from "@ui-kitten/components";
import PageHeader from "../../../components/PageHeader";
import LoadingButton from "../../../components/LoadingButton";
import SafeAreaView from "react-native-safe-area-view";
import dayjs from "dayjs";
const Filter = require("bad-words"),
  filter = new Filter();

let InitalValues = {
  email: "",
  password: "",
  username: "",
  fullname: "",
  dob: "",
};

const ValidationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .test("profanities_test", "Profanities are prohibited", item => {
      return !filter.isProfane(item);
    })
    .required("Required"),
  username: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .test("profanities_test", "Profanities are prohibited", item => {
      return !filter.isProfane(item);
    })
    .required("Required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("Required"),
  dob: Yup.date()
    .max(
      dayjs()
        .subtract(18, "year")
        .toDate(),
      "At least 18 years old"
    )
    .required("Required"),
});

export default class RegisterPage extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      SecureTextEntry: true,
    };
  }

  componentDidMount() {}

  async Register(values, setSubmitting) {
    var user;
    try {
      user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);

      await user.user.updateProfile({
        displayName: values.username,
      });

      if (user) {
        if (user.user.emailVerified) {
          this.props.navigation.navigate("App");
        } else {
          await user.user.sendEmailVerification();
          await firebase.auth().signOut();
          this.props.navigation.navigate("EmailVerificationPage", { Email: values.email });
        }
      }
    } catch (error) {
      if (user != null) {
        user.user.delete();
      }
      console.error(error);
      setSubmitting(false);
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <PageHeader ShowRightIcon={false} />
        <KeyboardAwareScrollView>
          <Formik
            initialValues={InitalValues}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting }) => this.Register(values, setSubmitting)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValidating,
              isSubmitting,
              setFieldValue,
            }) => (
              <View style={styles.FormWrapper}>
                <Text style={styles.Title}>Sign Up</Text>
                <View style={styles.SectionWrapper}>
                  <Input
                    status={errors.fullname && touched.fullname ? "danger" : "basic"}
                    placeholder="Full Name"
                    size="large"
                    onChangeText={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                    value={values.fullname}
                    style={styles.InputSpacing}
                    onSubmitEditing={() => {
                      this.UsernameInput.focus();
                    }}
                    blurOnSubmit={false}
                    caption={touched.fullname && errors.fullname}
                    autoCompleteType={"name"}
                    returnKeyType="next"
                    textContentType="givenName"
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  <Input
                    ref={ref => (this.UsernameInput = ref)}
                    status={errors.username && touched.username ? "danger" : "basic"}
                    placeholder="Display Name"
                    size="large"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    style={styles.InputSpacing}
                    onSubmitEditing={() => {
                      this.dobInput.focus();
                    }}
                    blurOnSubmit={false}
                    caption={touched.username && errors.username}
                    returnKeyType="next"
                    textContentType="nickname"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Datepicker
                    ref={ref => (this.dobInput = ref)}
                    icon={style => <Icon {...style} name="calendar" />}
                    status={errors.dob && touched.dob ? "danger" : "basic"}
                    date={values.dob}
                    onSelect={date => {
                      setFieldValue("dob", date, true);
                      this.dobInput.blur();
                    }}
                    size="large"
                    style={styles.InputSpacing}
                    caption={touched.dob && errors.dob}
                    placeholder="Date of Birth"
                    boundingMonth={true}
                    startView={CalendarViewModes.YEAR}
                    max={dayjs()
                      .subtract(18, "year")
                      .toDate()}
                    min={dayjs()
                      .subtract(200, "year")
                      .toDate()}
                  />

                  <Input
                    ref={ref => (this.EmailInput = ref)}
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
                    textContentType="newPassword"
                    autoCapitalize="none"
                  />
                </View>

                <LoadingButton isLoading={isSubmitting} disabled={isValidating || isSubmitting} onPress={handleSubmit}>
                  Sign Up
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
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
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
    marginBottom: hp(2),
  },
});

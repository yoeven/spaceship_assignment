import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon, Button } from "@ui-kitten/components";
import Modal from "react-native-modal";

//global alert modal

export default class GenericConfirmationModal extends React.PureComponent {
  static defaultProps = {};

  constructor(props) {
    super();
    this.state = {
      isModalVisible: false,
      ModalData: null,
      Decision: null,
    };
  }

  Show(ModalData) {
    //default config for prop data
    let defaultData = {
      message: "Alert",
      confirmButtonText: "Confirm",
      declineButtonText: "Cancel",
      showDeclineButton: true,
      showConfirmButton: true,
      svgImage: null,
      onConfirm: () => {},
      onReject: () => {},
      onCancel: () => {},
      cancelable: true,
      controlClose: false,
    };

    this.setState({ isModalVisible: true, decision: null, ModalData: { ...defaultData, ...ModalData } });
  }

  Close() {
    this.setState({ isModalVisible: false });
  }

  //based on the deision made of the user, the modal will react accordingly and call the callback function
  onButtonClick(decision) {
    const ModalData = this.state.ModalData;

    if (!ModalData.controlClose) {
      this.setState({
        isModalVisible: decision == "cancel" && !ModalData.cancelable ? true : false,
        Decision: decision,
      });
    } else {
      this.setState({ Decision: decision }, () => this.onDecision());
    }
  }

  onDecision() {
    const ModalData = this.state.ModalData;
    const decision = this.state.Decision;
    if (decision == null) return;

    switch (decision) {
      case "confirm":
        ModalData.hasOwnProperty("onConfirm") && ModalData.onConfirm();
        break;
      case "reject":
        ModalData.hasOwnProperty("onReject") && ModalData.onReject();
        break;
      case "cancel":
        ModalData.hasOwnProperty("onCancel") && ModalData.cancelable && ModalData.onCancel();
        if (ModalData.cancelable) break;
        else return;
    }
  }

  render() {
    if (this.state.ModalData == null) return null;
    const ModalData = this.state.ModalData;
    return (
      <Modal
        backdropOpacity={0.5}
        useNativeDriver={true}
        onBackButtonPress={() => this.onButtonClick("cancel")}
        onBackdropPress={() => this.onButtonClick("cancel")}
        onSwipeComplete={() => this.onButtonClick("cancel")}
        onModalHide={() => this.onDecision()}
        isVisible={this.state.isModalVisible}>
        <View style={styles.ModalWrapper}>
          <View style={styles.HeaderWrapper}>
            {ModalData.cancelable && (
              <TouchableWithoutFeedback onPress={() => this.onButtonClick("cancel")}>
                <Icon name="close-outline" width={wp(7)} height={wp(7)} fill="black" />
              </TouchableWithoutFeedback>
            )}
          </View>

          <View style={styles.InnerContentWrapper}>
            {ModalData.svgImage && (
              <ModalData.svgImage style={{ marginBottom: hp(5) }} width={"100%"} height={hp(20)} />
            )}
            <Text style={styles.MessageText}>{ModalData.message}</Text>
          </View>

          <View style={styles.ButtonButtonWrapper}>
            {ModalData.showConfirmButton && (
              <Button
                onPress={() => {
                  this.onButtonClick("confirm");
                }}
                status={"primary"}
                style={styles.SuccessButton}
                textStyle={styles.SuccessButtonText}
                appearance="filled">
                {ModalData.confirmButtonText}
              </Button>
            )}

            {ModalData.showDeclineButton && (
              <Button
                onPress={() => {
                  this.onButtonClick("reject");
                }}
                appearance="ghost">
                {ModalData.declineButtonText}
              </Button>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  ModalWrapper: {
    backgroundColor: "white",
    borderRadius: 8,
  },
  HeaderWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: wp(2),
    paddingTop: hp(1),
  },
  InnerContentWrapper: {
    paddingTop: hp(3),
    paddingHorizontal: wp(5),
  },
  ButtonButtonWrapper: {
    marginTop: hp(5),
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
  MessageText: {
    fontFamily: "roboto-regular",
    fontSize: hp(2.5),
    textAlign: "center",
    letterSpacing: 0.5,
  },
  SuccessButton: {
    width: "100%",
  },
  SuccessButtonText: {
    textAlign: "center",
  },
});

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import { GetCompleteUserData } from "../../processors/FireBaseManger";
import * as firebase from "firebase/app";

export default class ProfileTabIcon extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      profile_url: null,
      Loading: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        this.GetProfilePic();
      } else {
        this.setState({ profile_url: null });
      }
    });
  }

  async GetProfilePic() {
    const UserData = await GetCompleteUserData();
    if (UserData != null) {
      this.setState({
        profile_url: UserData.profile_image == null ? "https://i.imgur.com/LSBUyhe.png" : UserData.profile_image.url,
      });
    } else {
      this.setState({ profile_url: null });
    }
  }

  render() {
    return (
      <>
        {this.state.profile_url != null ? (
          <Image
            source={{
              uri: this.state.profile_url,
              cache: "force-cache",
            }}
            style={[styles.ProfileImage, { borderColor: this.props.tintColor }]}
          />
        ) : (
          <Icon name="person-outline" width={wp(7)} height={wp(7)} fill={this.props.tintColor} />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  ProfileImage: {
    width: wp(7),
    height: wp(7),
    borderRadius: 10,
    borderWidth: 1.5,
  },
});

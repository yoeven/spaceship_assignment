import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Code } from "react-content-loader/native";

export default class SkeletonLoadingList extends React.PureComponent {
  static defaultProps = {
    isLoading: false,
    number: 5,
  };

  constructor(props) {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: [...Array(this.props.number).keys()] });
  }

  render() {
    if (!this.props.isLoading) return null;
    return (
      <View style={styles.InnerWrapper}>
        <FlatList
          listKey={"SkeletonLoadingList"}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          removeClippedSubviews={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.LoaderCard}>
              <Code width={"100%"} speed={2} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  InnerWrapper: {
    paddingHorizontal: wp(3),
    flex: 1,
    paddingVertical: hp(5),
  },
  LoaderCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(5),
    marginBottom: hp(5),
  },
});

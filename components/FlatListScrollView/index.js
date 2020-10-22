import React from "react";
import { FlatList } from "react-native";

//A flatlist scroll view provides the performance of a flatlist with the child prop of a scrollview

export default class FlatListScrollView extends React.PureComponent {
  static defaultProps = {
    FlatListRef: () => {},
  };

  render() {
    return (
      <FlatList
        {...this.props}
        ref={ref => this.props.FlatListRef(ref)}
        data={this.props.children}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
    );
  }
}

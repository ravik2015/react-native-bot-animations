/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  LayoutAnimation,
  Dimensions
} from "react-native";
import AnimatedFlatlist from "react-native-animated-flatlist"; //react-native-
import { TypingAnimation } from "react-native-typing-animation";
const { height, width } = Dimensions.get("window");
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const { UIManager } = NativeModules;
const CustomLayoutAnimation = {
  duration: 600,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: "1", name: "Hi I am Hiro, How can I help you?" }],
      flexDirection: "column"
    };
  }
  called = () => {
    Array.prototype.insert = function(index, item) {
      this.splice(index, 0, item);
    };
    let allData = [...this.state.data];
    let item = {
      id: Math.floor(Math.random() * 90 + 10),
      name: Math.random()
        .toString(36)
        .substring(7)
    };

    allData.insert(0, item);

    this.setState({ data: allData });
  };

  componentDidMount = () => {
    this._interval = setInterval(() => {
      LayoutAnimation.configureNext(CustomLayoutAnimation);
      this.called();
    }, 3000);
  };

  componentWillMount = () => {
    clearInterval(this._interval);
  };

  render() {
    console.log(this.state.data, "ITEMS");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>

        <View
          style={{
            flex: 0.9
          }}
        >
          <AnimatedFlatlist
            items={this.state.data}
            id={"id"}
            inAnimation={"fadeIn"}
            outAnimation={"fadeOut"}
            duration={300}
            inverted
            rowItem={item => {
              return (
                <View
                  style={{
                    height: 40,
                    // backgroundColor: "grey",
                    marginTop: 10,
                    borderRadius: 20,
                    borderColor: "#dadada",
                    borderWidth: 1,
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    width: 100,
                    alignSelf: "flex-start"
                  }}
                >
                  <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                    {item.item.name}
                  </Text>
                </View>
              );
            }}
          />
          <View style={{ flex: 0.1 }}>
            <TypingAnimation
              style={{ marginLeft: 20, marginTop: 10 }}
              dotColor="black"
              dotMargin={3}
              dotAmplitude={3}
              dotRadius={2.5}
              dotX={12}
              dotY={6}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

//We are going to create a key constant so that we can set the
//name of the key we will use to save the content.
const key = "@MyApp:key";

export default class App extends Component {
  state = {
    text: "",
    storedValue: ""
  };

  //display the content once the app loads, so we'll need to read
  //the local value in the componentWillMount life cycle method
  componentWillMount() {
    this.onLoad();
  }

  //The onLoad function loads the current content from the local storage

  onLoad = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      this.setState({ storedValue });
    } catch (error) {
      Alert.alert("Error", "There was an error while loading the data");
    }
  };

  // Saving the data
  //We'll declare a key to save any data we want to associate with that key,
  // via the setItem method of AsyncStorage
  onSave = async () => {
    const { text } = this.state;

    try {
      await AsyncStorage.setItem(key, text);
      Alert.alert("Saved", "Successfully saved on device");
    } catch (error) {
      Alert.alert("Error", "There was an error while saving the data");
    }
  };
  //saving the value from the input text to the sate
  onChange = text => {
    this.setState({ text });
  };

  render() {
    const { storedValue, text } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.preview}>{storedValue}</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={this.onChange}
            value={text}
            placeholder="Type something here..."
          />

          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text>Save locally</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLoad} style={styles.button}>
            <Text>Load data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  preview: {
    backgroundColor: "#bdc3c7",
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: "#333",
    marginBottom: 50
  },
  input: {
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5
  },
  button: {
    backgroundColor: "#f39c12",
    padding: 10,
    borderRadius: 3,
    marginTop: 10
  }
});

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Button, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Splash_screen = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image
        resizeMode='cover'
        source={require('../images/image1.jpeg')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Heading style={styles.heading} size="2xl">Taskcy</Heading>
        <Text style={styles.subheading}>Building better Workplaces</Text>
        <Text style={styles.description}>create a unique emotional story that</Text>
        <Text style={styles.description}>describes better than words</Text>
        <Button
          onPress={() => navigation.navigate("Slider_screen1")}
          width={"80%"}
          style={styles.button}
          size="lg"
        >
          Get Started
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '50%', // Adjust as necessary
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: '90%', // Adjust to position content below the image
    paddingTop: 35,
    gap: 10,
    backgroundColor: "#F5F7F8",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 1, // Ensures this container is on top of the image
    width: '100%',
  },
  heading: {
    color: "#604CC3",
  },
  subheading: {
    color: "#102C57",
    fontSize: 20,
  },
  description: {
    color: "#939185",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#B1AFFF",
    marginTop: 20,
  },
});

export default Splash_screen;

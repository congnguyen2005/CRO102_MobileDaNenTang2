import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const Bai1Screen = () => {
  const position = useSharedValue(-20); // Vị trí ban đầu của cục xanh

  const moveBox = () => {
    position.value = Math.random() * 100 + 50; // Random vị trí Y mới
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(position.value, { duration: 500 }) }],
    };
  });

  return (
    <View style={styles.container}>
      <Button title="Move" onPress={moveBox} />
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    marginTop: 20,
  },
});

export default Bai1Screen;

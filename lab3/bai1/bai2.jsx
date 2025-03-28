import React, { useCallback, useRef, useState } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const DATA = Array.from({ length: 20 }, (_, i) => ({ id: i.toString() })); // Danh sách giả lập

const AnimatedItem = React.memo(({ isVisible }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(0.9);

  if (isVisible) {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withTiming(0, { duration: 500 });
    scale.value = withTiming(1, { duration: 500 });
  } else {
    opacity.value = withTiming(0, { duration: 500 });
    translateY.value = withTiming(20, { duration: 500 });
    scale.value = withTiming(0.9, { duration: 500 });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return <Animated.View style={[styles.item, animatedStyle]} />;
});

const Bai2Screen = () => {
  const [visibleItems, setVisibleItems] = useState(new Map());

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const newVisibleItems = new Map();
    viewableItems.forEach((item) => {
      newVisibleItems.set(item.item.id, true);
    });
    setVisibleItems(newVisibleItems);
  }, []);

  const renderItem = ({ item }) => {
    const isVisible = visibleItems.has(item.id);
    return <AnimatedItem isVisible={isVisible} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }} // Đảm bảo item hiện trên 50% mới kích hoạt animation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    width: width * 0.9,
    height: 80,
    backgroundColor: "lightblue",
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: "center",
  },
});

export default Bai2Screen;

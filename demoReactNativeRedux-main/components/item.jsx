import { Text } from "react-native";
function Item({ item }) {
  return (
    <Text
      style={{
        padding: 10,
        fontSize: 18,
        height: 44,
      }}
    >
      {item.key}
    </Text>
  );
}

export default Item;

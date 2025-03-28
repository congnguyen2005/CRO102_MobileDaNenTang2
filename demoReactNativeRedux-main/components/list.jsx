import { FlatList, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Item from "./item";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});
function List() {
  let data = useSelector((state) => state.todos);
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({ item }) => <Item item={item} />} />
    </View>
  );
}
export default List;

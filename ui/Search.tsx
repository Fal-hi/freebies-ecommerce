import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: any;
  style?: object;
};

export function Search({
  placeholder = "Search Product Name",
  onChange,
  style,
}: SearchProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        placeholderTextColor={Colors.default.placeholder}
      />
      <Ionicons name="search-outline" size={25} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.default.gray2,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    fontWeight: "400",
  },
});

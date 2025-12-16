import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  style?: object;
};

export function Search({
  placeholder = "Search Product Name",
  onChange,
  value,
  style,
}: SearchProps) {
  const { colors, theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "light" ? Colors.default.gray2 : "#2A2A2A",
        },
        style,
      ]}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={colors.icon}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={Colors.default.placeholder}
        onChangeText={onChange}
        value={value}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.default.gray2,
    marginBottom: 30,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
  },
});

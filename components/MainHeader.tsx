import { Header } from "@/ui/Header";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Text, View, StyleSheet } from "react-native";
import { Notification } from "@/components/Notification";
import { CartProduct } from "@/components/Cart";

export function MainHeader() {
  const { defaultColors } = useTheme();

  return (
    <Header>
      <Text style={[styles.headerTitle, { color: defaultColors.blue }]}>
        Mega Mall
      </Text>
      <View style={styles.notifications}>
        <Notification />
        <CartProduct />
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.default.blue,
  },
  notifications: {
    flexDirection: "row",
    columnGap: 14,
  },
});

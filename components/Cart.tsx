import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/context/CartContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export function CartProduct() {
  const { cartItems } = useCart();
  const { colors } = useTheme();
  return (
    <Pressable style={styles.notification} onPress={() => router.push("/cart")}>
      {cartItems.length > 0 && (
        <View style={styles.dot}>
          <Text style={styles.dotText}>{cartItems.length}</Text>
        </View>
      )}
      <Ionicons
        name="cart-outline"
        size={24}
        color={cartItems.length > 0 ? Colors.default.red : colors.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  notification: {
    position: "relative",
  },
  dot: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    backgroundColor: Colors.default.red,
    borderRadius: 20,
    zIndex: 1,
  },
  dotText: {
    paddingTop: 0.5,
    fontSize: 10,
    fontWeight: "700",
    color: Colors.default.white,
    textAlign: "center",
  },
});

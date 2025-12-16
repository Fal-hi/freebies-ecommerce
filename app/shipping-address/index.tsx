import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Header } from "@/ui/Header";
import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export default function ShippingAddressScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header>
        <CaretLeft
          width="16"
          height="16"
          onPress={() => router.back()}
          fill={colors.text}
        />
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Shipping Address
        </Text>
        <View style={{ width: 16 }} />
      </Header>
      <View style={styles.content}>
        <View
          style={[styles.addressCard, { borderColor: colors.tabIconDefault }]}
        >
          <View style={styles.addressHeader}>
            <Text style={[styles.addressName, { color: colors.text }]}>
              Home
            </Text>
            <Text style={styles.defaultBadge}>Default</Text>
          </View>
          <Text style={[styles.addressText, { color: colors.text }]}>
            123 Main Street, Apt 4B{"\n"}
            New York, NY 10001
          </Text>
          <Text style={[styles.addressPhone, { color: colors.text }]}>
            +1 234 567 890
          </Text>
        </View>

        <View
          style={[styles.addressCard, { borderColor: colors.tabIconDefault }]}
        >
          <Text style={[styles.addressName, { color: colors.text }]}>
            Office
          </Text>
          <Text style={[styles.addressText, { color: colors.text }]}>
            456 Business Blvd, Suite 200{"\n"}
            San Francisco, CA 94105
          </Text>
          <Text style={[styles.addressPhone, { color: colors.text }]}>
            +1 987 654 321
          </Text>
        </View>

        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Address</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.default.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  content: {
    padding: 20,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: Colors.default.line,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.default.black,
    marginBottom: 5,
  },
  defaultBadge: {
    fontSize: 12,
    color: Colors.default.blue,
    backgroundColor: Colors.default.lightPurple,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addressText: {
    fontSize: 14,
    color: Colors.default.gray,
    lineHeight: 20,
    marginBottom: 10,
  },
  addressPhone: {
    fontSize: 14,
    color: Colors.default.black,
  },
  addButton: {
    backgroundColor: Colors.default.blue,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: Colors.default.white,
    fontWeight: "600",
    fontSize: 16,
  },
});

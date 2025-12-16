import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Header } from "@/ui/Header";
import { router } from "expo-router";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

const orders = [
  {
    id: "12345",
    date: "2023-10-25",
    status: "Delivered",
    total: 120.5,
    items: 3,
  },
  {
    id: "12346",
    date: "2023-10-20",
    status: "Processing",
    total: 45.0,
    items: 1,
  },
  {
    id: "12347",
    date: "2023-10-15",
    status: "Cancelled",
    total: 80.0,
    items: 2,
  },
];

export default function MyOrderScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={[
        styles.orderItem,
        {
          backgroundColor: colors.background,
          borderColor: colors.tabIconDefault,
        },
      ]}
    >
      <View style={styles.orderHeader}>
        <Text style={[styles.orderId, { color: colors.text }]}>
          Order #{item.id}
        </Text>
        <Text
          style={[styles.orderStatus, { color: getStatusColor(item.status) }]}
        >
          {item.status}
        </Text>
      </View>
      <View style={styles.orderInfo}>
        <Text style={[styles.orderDate, { color: colors.text }]}>
          {item.date}
        </Text>
        <Text style={[styles.orderTotal, { color: colors.text }]}>
          {item.items} Items -{" "}
          <Text style={[styles.price, { color: colors.text }]}>
            ${item.total.toFixed(2)}
          </Text>
        </Text>
      </View>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return Colors.default.green;
      case "Processing":
        return Colors.default.yellow;
      case "Cancelled":
        return Colors.default.red;
      default:
        return colors.text;
    }
  };

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
          My Orders
        </Text>
        <View style={{ width: 16 }} />
      </Header>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    padding: 20,
  },
  orderItem: {
    backgroundColor: Colors.default.white,
    borderWidth: 1,
    borderColor: Colors.default.line,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.default.black,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDate: {
    fontSize: 14,
    color: Colors.default.gray,
  },
  orderTotal: {
    fontSize: 14,
    color: Colors.default.black,
  },
  price: {
    fontWeight: "700",
  },
});

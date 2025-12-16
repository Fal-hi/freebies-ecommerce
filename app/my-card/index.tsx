import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Header } from "@/ui/Header";
import { router } from "expo-router";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export default function MyCardScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} fill={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Card</Text>
        <View style={{ width: 16 }} />
      </Header>
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: "#1A1A1A" }]}>
            <Text style={styles.cardType}>MasterCard</Text>
            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
            <View style={styles.cardFooter}>
                <View>
                    <Text style={styles.cardLabel}>Card Holder</Text>
                    <Text style={styles.cardValue}>Yelena Belova</Text>
                </View>
                <View>
                    <Text style={styles.cardLabel}>Expires</Text>
                    <Text style={styles.cardValue}>12/25</Text>
                </View>
            </View>
        </View>

        <View style={[styles.card, { backgroundColor: "#0056D2" }]}>
            <Text style={styles.cardType}>Visa</Text>
            <Text style={styles.cardNumber}>**** **** **** 5678</Text>
            <View style={styles.cardFooter}>
                <View>
                    <Text style={styles.cardLabel}>Card Holder</Text>
                    <Text style={styles.cardValue}>Yelena Belova</Text>
                </View>
                <View>
                    <Text style={styles.cardLabel}>Expires</Text>
                    <Text style={styles.cardValue}>09/24</Text>
                </View>
            </View>
        </View>

        <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Card</Text>
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
  card: {
      borderRadius: 15,
      padding: 25,
      marginBottom: 20,
      height: 200,
      justifyContent: "space-between"
  },
  cardType: {
      color: Colors.default.white,
      fontSize: 18,
      fontWeight: "700",
      fontStyle: "italic",
      textAlign: "right"
  },
  cardNumber: {
        color: Colors.default.white,
        fontSize: 22,
        fontWeight: "600",
        letterSpacing: 2
  },
  cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between"
  },
  cardLabel: {
      color: "#f0f0f0",
      fontSize: 12,
      marginBottom: 4
  },
  cardValue: {
      color: Colors.default.white,
      fontSize: 16,
      fontWeight: "600"
  },
  addButton: {
      backgroundColor: Colors.default.blue,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20
  },
  addButtonText: {
      color: Colors.default.white,
      fontWeight: "600",
      fontSize: 16
  }
});

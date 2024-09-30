import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Header } from "@/ui/Header";
import { Colors } from "@/constants/Colors";
import { Search } from "@/ui/Search";
import { Cards } from "@/components/home/Cards";
import { Categories } from "@/components/home/Categories";
import { Products } from "@/components/home/Products";
import { CardHighlight } from "@/components/home/CardHighlight";
import { cardProductData } from "@/libs/data";
import ProductHighlight1 from "@/assets/products/shoes2.png";
import ProductHighlight2 from "@/assets/products/hoodie1.png";
import { Bell, Cart } from "@/assets/icons";

export default function AnotherTabs() {
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Bell width="18" height="18" />
        <Text style={styles.headerTitle}>Mega Mall</Text>
        <Cart width="20" height="20" />
      </Header>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.default.white,
  },
  containerTop: {
    backgroundColor: Colors.default.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerProduct: {
    flexDirection: "column",
    rowGap: 20,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.default.blue,
  },
});

import {
  LogBox,
  Pressable,
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
import { cardProductData, dataCart } from "@/libs/data";
import { Bell, Cart } from "@/assets/icons";
import { router } from "expo-router";

// Menonaktifkan warning tertentu
LogBox.ignoreLogs([
  "react-native-snap-carousel: It is recommended to use at least version 0.44 of React Native with the plugin",
]);

export default function HomeScreen() {
  const topSoldProduct = cardProductData.sort((a, b) => b.sold - a.sold)[0];
  const topSpecialOfferProduct = cardProductData.sort(
    (a, b) => a.price - b.price
  )[0];
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.headerTitle}>Mega Mall</Text>
        <View style={styles.notifications}>
          <Pressable
            style={styles.notification}
            onPress={() => router.push("/")}
          >
            <View style={styles.dot}>
              <Text style={styles.dotText}>8</Text>
            </View>
            <Bell width="24" height="24" />
          </Pressable>
          <Pressable
            style={styles.notification}
            onPress={() => router.push("/cart")}
          >
            <View style={styles.dot}>
              <Text style={styles.dotText}>{dataCart.length}</Text>
            </View>
            <Cart width="24" height="24" />
          </Pressable>
        </View>
      </Header>
      <ScrollView>
        <View style={styles.containerTop}>
          <Search />
          <Cards />
          <Categories />
        </View>
        <View style={styles.containerProduct}>
          <CardHighlight
            title={topSoldProduct.title}
            image={topSoldProduct.image}
            bgColor={Colors.default.green}
            link="/best-seller"
          />
          <Products
            titleProduct="Best Sellers"
            dataProduct={cardProductData}
            linkProducts="/best-seller"
          />
          <CardHighlight
            title={topSpecialOfferProduct.title}
            image={topSpecialOfferProduct.image}
            bgColor={Colors.default.blue}
            link="/special-offer"
          />
          <Products
            titleProduct="Special Offers"
            dataProduct={cardProductData}
            linkProducts="/special-offer"
          />
        </View>
      </ScrollView>
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
    paddingTop: 10,
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
  notifications: {
    flexDirection: "row",
    columnGap: 14,
  },
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

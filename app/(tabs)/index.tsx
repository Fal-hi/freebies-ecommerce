import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Search } from "@/ui/Search";
import { Cards } from "@/components/home/Cards";
import { Categories } from "@/components/home/Categories";
import { Products } from "@/components/home/Products";
import { CardHighlight } from "@/components/home/CardHighlight";
import { SearchResults } from "@/components/home/SearchResults";
import { cardProductData } from "@/libs/data";
import { useTheme } from "@/context/ThemeContext";
import { MainLayout } from "@/components/MainLayout";

export default function HomeScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const topSoldProduct = cardProductData.sort((a, b) => b.sold - a.sold)[0];
  const topSpecialOfferProduct = cardProductData.sort(
    (a, b) => a.price - b.price
  )[0];

  // Filter products based on search query
  const filteredProducts = cardProductData.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSearching = searchQuery.trim().length > 0;

  return (
    <MainLayout>
      <ScrollView>
        <View
          style={[styles.containerTop, { backgroundColor: colors.background }]}
        >
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Product Name"
          />
          {!isSearching && (
            <>
              <Cards />
              <Categories />
            </>
          )}
        </View>
        {isSearching ? (
          <SearchResults
            products={filteredProducts}
            searchQuery={searchQuery}
          />
        ) : (
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
        )}
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  containerProduct: {
    flexDirection: "column",
    rowGap: 20,
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

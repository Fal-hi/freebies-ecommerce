import { CaretLeft } from "@/assets/icons";
import FilterProducts from "@/components/FilterProducts";
import { Colors } from "@/constants/Colors";
import { cardProductData } from "@/libs/data";
import { CardProduct } from "@/ui/CardProduct";
import { Header } from "@/ui/Header";
import { Search } from "@/ui/Search";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartProduct } from "@/components/Cart";
import { useTheme } from "@/context/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function SpecialOfferProducts() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(cardProductData);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const params = useLocalSearchParams();
  const { id, title } = params;

  const applyFilters = (filters: {
    categories: string[];
    maxPrice?: number;
  }) => {
    setMaxPrice(filters.maxPrice);
    const filtered = cardProductData
      .filter(
        (product: any) =>
          (filters.categories.length === 0 ||
            filters.categories.includes(product.category)) &&
          (!filters.maxPrice || product.specialOffer <= filters.maxPrice) &&
          product.specialOffer
      )
      .sort((a, b) => b.sold - a.sold);

    setFilteredProducts(filtered);
    setOpenFilter(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = cardProductData
      .filter((product) => {
        if (typeof product.title === "string") {
          const matchesSearch = product.title
            .toLowerCase()
            .includes(text.toLowerCase());
          return (
            matchesSearch &&
            (!maxPrice || product.price <= maxPrice) &&
            product.specialOffer
          );
        }
        return false;
      })
      .sort((a, b) => b.sold - a.sold);

    setFilteredProducts(filtered);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.containerTop, { backgroundColor: colors.background }]}>
        <Header>
          <CaretLeft width="16" height="16" onPress={() => router.back()} fill={colors.text} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Special Offers</Text>
          <CartProduct />
        </Header>
        <Search style={styles.search} value={search} onChange={handleSearch} />
      </View>
      <ScrollView contentContainerStyle={[styles.containerContent, { backgroundColor: colors.background === '#151718' ? '#000' : Colors.default.gray2 }]}>
        <View style={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <CardProduct
                key={item.id}
                id={item.id}
                image={item.image}
                images={item.images}
                title={item.title}
                category={item.category}
                price={item.price}
                specialOffer={item.specialOffer}
                sold={item.sold}
                rating={item.rating}
                reviewer={item.reviewer}
              />
            ))
          ) : (
            <View style={styles.productNotFound}>
              <Text style={[styles.textNotFound, { color: colors.text }]}>Product Not Found</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <FilterProducts
        open={openFilter}
        setOpen={setOpenFilter}
        onApply={applyFilters}
        initialMaxPrice={maxPrice}
        title="Filter Products"
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
  containerTop: {
    backgroundColor: Colors.default.white,
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
  search: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  containerContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "space-between",
  },
  productNotFound: {
    height: height * 0.7,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  textNotFound: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
});

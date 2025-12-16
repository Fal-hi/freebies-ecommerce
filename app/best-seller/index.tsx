import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { cardProductData } from "@/libs/data";
import { CardProduct } from "@/ui/CardProduct";
import { Header } from "@/ui/Header";
import { Search } from "@/ui/Search";

import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartProduct } from "@/components/Cart";
import { useTheme } from "@/context/ThemeContext";
import FilterProducts from "@/components/FilterProducts";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function BestSellerProducts() {
  const { colors } = useTheme();
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(cardProductData);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

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
          Best Seller
        </Text>
        <CartProduct />
      </Header>
      <Search style={styles.containerHeader} />
      <ScrollView contentContainerStyle={styles.containerContent}>
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
              <Text style={[styles.textNotFound, { color: colors.text }]}>
                Product Not Found
              </Text>
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
  },
  containerHeader: {
    marginHorizontal: 20,
    marginTop: 20,
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
  filterButton: {
    color: Colors.default.blue,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalContent: {
    marginTop: 15,
    flexDirection: "column",
    rowGap: 6,
  },
  checkboxContent: {
    width: "100%",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  checkbox: {
    marginRight: -17,
  },
  divider: {
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 15,
    marginTop: 40,
  },
  buttonReset: {
    width: "48%",
    borderColor: Colors.default.black,
  },
  buttonApply: {
    width: "48%",
    borderColor: Colors.default.blue,
    backgroundColor: Colors.default.blue,
  },
  buttonApplyTitle: {
    color: Colors.default.white,
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

import { CaretLeft } from "@/assets/icons";
import { CartProduct } from "@/components/Cart";
import { NumberInput } from "@/components/NumberInput";
import { Colors } from "@/constants/Colors";
import { cardProductData } from "@/libs/data";
import { Button } from "@/ui/Button";
import { CardProduct } from "@/ui/CardProduct";
import { Divider } from "@/ui/Divider";
import { Header } from "@/ui/Header";
import { Modals } from "@/ui/Modal";
import { Search } from "@/ui/Search";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export default function CategoryDetails() {
  const { colors } = useTheme();
  const [openFilter, setOpenFilter] = useState(false);
  const params = useLocalSearchParams();
  const { id, title } = params;
  const filteredProducts = cardProductData.filter(
    (product) => product.category === title
  );

  function CheckboxContent({ title }: { title: string }) {
    return (
      <View style={styles.checkboxContent}>
        <Text style={[styles.checkboxTitle, { color: colors.text }]}>{title}</Text>
        <View style={styles.checkbox}>
          <BouncyCheckbox
            size={25}
            fillColor={Colors.default.oldGreen}
            unFillColor={colors.background}
            innerIconStyle={{
              borderWidth: 1,
              borderColor: Colors.default.line,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} fill={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>
        <CartProduct />
      </Header>
      <Search style={styles.containerHeader} />
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.productsContainer}>
          {filteredProducts.map((item) => (
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
          ))}
        </View>
      </ScrollView>
      <Ionicons
        name="filter-circle"
        size={50}
        style={styles.filterButton}
        onPress={() => setOpenFilter(true)}
      />
      <Modals
        open={openFilter}
        setOpen={() => setOpenFilter(!openFilter)}
        title="Filter"
      >
        <View style={styles.modalContent}>
          <NumberInput
            label="Maximum Price Range"
            placeholder="Set maximum price range"
            min={1}
            max={100}
          />
          <CheckboxContent title="T-shirt" />
          <Divider style={styles.divider} />
          <CheckboxContent title="Pants" />
          <Divider style={styles.divider} />
          <CheckboxContent title="Shoes" />
          <Divider style={styles.divider} />
          <CheckboxContent title="Hoodie" />
        </View>
        <View style={styles.modalButtons}>
          <Button
            title="Reset"
            onPress={() => setOpenFilter(false)}
            style={styles.buttonReset}
          />
          <Button
            title="Apply"
            onPress={() => setOpenFilter(false)}
            style={styles.buttonApply}
            styleTitle={styles.buttonApplyTitle}
          />
        </View>
      </Modals>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.default.white,
  },
  containerHeader: {
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
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
});

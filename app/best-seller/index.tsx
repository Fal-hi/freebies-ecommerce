import { CaretLeft, Cart } from "@/assets/icons";
import { NumberInput } from "@/components/NumberInput";
import { Colors } from "@/constants/Colors";
import { cardProductData, dataCart } from "@/libs/data";
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
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function BestSellerProducts() {
  const [openFilter, setOpenFilter] = useState(false);
  const params = useLocalSearchParams();
  const { id, title } = params;

  function CheckboxContent({ title }: { title: string }) {
    return (
      <View style={styles.checkboxContent}>
        <Text style={styles.checkboxTitle}>{title}</Text>
        <View style={styles.checkbox}>
          <BouncyCheckbox
            size={25}
            fillColor={Colors.default.oldGreen}
            unFillColor={Colors.default.white}
            innerIconStyle={{
              borderWidth: 1,
              borderColor: Colors.default.line,
            }}
            //   onPress={(isChecked: boolean) => {
            //     console.log(isChecked);
            //   }}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Best Seller</Text>
        <Pressable
          style={styles.notification}
          onPress={() => router.push("/cart")}
        >
          <View style={styles.dot}>
            <Text style={styles.dotText}>{dataCart.length}</Text>
          </View>
          <Cart width="24" height="24" />
        </Pressable>
      </Header>
      <Search style={styles.containerHeader} />
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.productsContainer}>
          {cardProductData
            .sort((a, b) => b.sold - a.sold)
            .map((item) => (
              <CardProduct
                key={item.id}
                id={item.id}
                image={item.image}
                images={item.images}
                title={item.title}
                price={item.price}
                specialOffer={item.specialOffer}
                sold={item.sold}
                rating={item.rating}
                reviewer={item.reviewer}
                totalProduct={item.totalProduct}
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
    backgroundColor: Colors.default.gray2,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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

import { CaretLeft, Check, Edit } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Header } from "@/ui/Header";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { dataCart } from "@/libs/data";
import { useState } from "react";
import { router } from "expo-router";
import { Modals } from "@/ui/Modal";
import { Button } from "@/ui/Button";

type CheckedItemsProps = {
  [key: string | number]: boolean;
};

type ProductQuantitiesProps = {
  [key: string | number]: number;
};

type CartProps = {
  id: number;
  image: number;
  title: string;
  category: string;
  price: number;
};

export default function Cart() {
  const [checkedItems, setCheckedItems] = useState<CheckedItemsProps>({});
  const [productQuantities, setProductQuantities] =
    useState<ProductQuantitiesProps>(
      dataCart.reduce((acc: any, item: CartProps) => {
        acc[item.id] = 1; // Set default quantity to 1
        return acc;
      }, {})
    );
  const [openEdit, setOpenEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  function TotalProduct({ itemId }: { itemId: number }) {
    return (
      <View style={styles.boxTotalProduct}>
        <Pressable onPress={() => handleDecrement(itemId)}>
          <Text style={styles.box}>-</Text>
        </Pressable>
        <Text style={styles.box}>{productQuantities[itemId]}</Text>
        <Pressable onPress={() => handleIncrement(itemId)}>
          <Text style={styles.box}>+</Text>
        </Pressable>
      </View>
    );
  }

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleDelete = () => {
    // setOpenEdit(!openEdit);
    setOpenModalDelete(!openModalDelete);
  };

  const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
    setCheckedItems((prevCheckedItems: any) => ({
      ...prevCheckedItems,
      [itemId]: isChecked,
    }));
  };

  const handleAllProductsChange = (isChecked: boolean) => {
    const newCheckedItems: any = {};
    if (isChecked) {
      dataCart.forEach((item) => {
        newCheckedItems[item.id] = true;
      });
    }
    setCheckedItems(newCheckedItems);
  };

  const handleIncrement = (itemId: number) => {
    setProductQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 1) + 1,
    }));
  };

  const handleDecrement = (itemId: number) => {
    setProductQuantities((prevQuantities: any) => {
      const newQuantity = (prevQuantities[itemId] || 1) - 1;
      return {
        ...prevQuantities,
        [itemId]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  const totalPriceCheckout = dataCart.reduce((total, item) => {
    const quantity = productQuantities[item.id] || 1;
    return checkedItems[item.id] ? total + item.price * quantity : total;
  }, 0);

  const isAllChecked =
    dataCart.length > 0 && dataCart.every((item) => checkedItems[item.id]);

  const totalProduct = Object.keys(checkedItems).filter(
    (key) => checkedItems[key]
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>My Cart</Text>
        {openEdit ? (
          <Check width="24" height="24" onPress={handleEdit} />
        ) : (
          <Edit width="24" height="24" onPress={handleEdit} />
        )}
      </Header>
      <ScrollView style={styles.containerContent}>
        {dataCart.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={styles.boxLeft}>
              <BouncyCheckbox
                size={25}
                fillColor={Colors.default.blue}
                unFillColor={Colors.default.white}
                innerIconStyle={{
                  borderWidth: 1,
                  borderColor: Colors.default.line,
                }}
                isChecked={checkedItems[item.id] || false}
                onPress={(isChecked) =>
                  handleCheckboxChange(item.id, isChecked)
                }
              />
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.content}>
              <View>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.price}>${item.price}</Text>
                <TotalProduct itemId={item.id} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.checkout}>
        <View style={styles.checkoutLeft}>
          <View style={styles.checkoutCheckbox}>
            <BouncyCheckbox
              size={25}
              fillColor={Colors.default.blue}
              unFillColor={Colors.default.white}
              innerIconStyle={{
                borderWidth: 1,
                borderColor: Colors.default.line,
              }}
              style={{ marginTop: -8, marginRight: -5 }}
              isChecked={isAllChecked}
              onPress={handleAllProductsChange}
            />
            <Text style={styles.checkoutText}>All Products</Text>
          </View>
        </View>
        {openEdit ? (
          <>
            <Pressable style={styles.checkoutButton} onPress={handleDelete}>
              <Text style={styles.checkoutButtonText}>
                Delete (
                {
                  Object.keys(checkedItems).filter((key) => checkedItems[key])
                    .length
                }
                )
              </Text>
              <Modals
                open={openModalDelete}
                setOpen={() => setOpenModalDelete(!openModalDelete)}
                title="Remove"
              >
                <Text style={styles.modalText}>
                  Are you sure want to remove {totalProduct}{" "}
                  {totalProduct < 2 ? "product" : "products"}?
                </Text>
                <View style={styles.modalButtons}>
                  <Button
                    title="No"
                    onPress={() => setOpenModalDelete(!openModalDelete)}
                    style={styles.buttonReset}
                  />
                  <Button
                    title="Yes"
                    onPress={() => setOpenModalDelete(!openModalDelete)}
                    style={styles.buttonApply}
                    styleTitle={styles.buttonApplyTitle}
                  />
                </View>
              </Modals>
            </Pressable>
          </>
        ) : (
          <View style={styles.checkoutRight}>
            <View>
              <Text style={styles.checkoutTotalPrice}>Total</Text>
              <Text style={styles.totalPrice}>
                ${totalPriceCheckout.toFixed(2)}
              </Text>
            </View>
            <Pressable style={styles.checkoutButton} onPress={() => {}}>
              <Text style={styles.checkoutButtonText}>
                Checkout (
                {
                  Object.keys(checkedItems).filter((key) => checkedItems[key])
                    .length
                }
                )
              </Text>
            </Pressable>
          </View>
        )}
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
  containerContent: {
    backgroundColor: Colors.default.gray2,
  },
  row: {
    backgroundColor: Colors.default.white,
    flexDirection: "row",
    columnGap: 15,
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  boxLeft: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "62%",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: Colors.default.black,
  },
  category: {
    fontSize: 14,
    fontWeight: "300",
    color: Colors.default.gray,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.default.red,
  },
  boxTotalProduct: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.default.gray,
    borderRadius: 5,
    paddingHorizontal: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  checkout: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkoutLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkoutCheckbox: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  checkoutRight: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "400",
  },
  checkoutTotalPrice: {
    fontWeight: "400",
    fontSize: 14,
    textAlign: "right",
  },
  totalPrice: {
    color: Colors.default.red,
    fontWeight: "700",
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: Colors.default.red,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontWeight: "500",
    color: Colors.default.white,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 15,
    marginTop: 20,
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
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

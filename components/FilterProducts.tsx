import { Colors } from "@/constants/Colors";
import { cardProductData } from "@/libs/data";
import { Modals } from "@/ui/Modal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { NumberInput } from "./NumberInput";
import { Divider } from "@/ui/Divider";
import { Button } from "@/ui/Button";

type FilterModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (filters: { categories: string[]; maxPrice?: number }) => void;
  title: string;
  initialMaxPrice?: number;
};

export default function FilterProducts({
  open,
  setOpen,
  onApply,
  title,
  initialMaxPrice,
}: FilterModalProps) {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);

  function CheckboxContent({ title }: { title: string }) {
    const isChecked = checkedCategories.includes(title);

    const handleCheckboxChange = (checked: boolean) => {
      if (checked) {
        setCheckedCategories([...checkedCategories, title]);
      } else {
        setCheckedCategories(
          checkedCategories.filter((category) => category !== title)
        );
      }
    };
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
            isChecked={isChecked}
            onPress={handleCheckboxChange}
          />
        </View>
      </View>
    );
  }

  const handleApply = () => {
    onApply({ categories: checkedCategories, maxPrice: maxPrice });
    setOpen(false);
  };

  return (
    <>
      <Ionicons
        name="filter-circle"
        size={50}
        style={styles.filterButton}
        onPress={() => setOpen(!open)}
      />
      <Modals open={open} setOpen={() => setOpen(!open)} title={title}>
        <View style={styles.modalContent}>
          <NumberInput
            label="Maximum Price Range"
            placeholder="Set maximum price range"
            min={1}
            max={100}
            value={maxPrice ? String(maxPrice) : ""}
            onChangeText={(value) => setMaxPrice(Number(value))}
          />
          <CheckboxContent title="T-shirts" />
          <Divider style={styles.divider} />
          <CheckboxContent title="Pants" />
          <Divider style={styles.divider} />
          <CheckboxContent title="Shoes" />
          <Divider style={styles.divider} />
          <CheckboxContent title="Hoodies" />
        </View>
        <View style={styles.modalButtons}>
          <Button
            title="Reset"
            onPress={() => setCheckedCategories([])}
            style={styles.buttonReset}
          />
          <Button
            title="Apply"
            onPress={handleApply}
            style={styles.buttonApply}
            styleTitle={styles.buttonApplyTitle}
          />
        </View>
      </Modals>
    </>
  );
}

const styles = StyleSheet.create({
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

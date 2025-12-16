import { Colors } from "@/constants/Colors";
import { Modals } from "@/ui/Modal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NumberInput } from "./NumberInput";
import { Button } from "@/ui/Button";
import { CheckboxItem } from "@/ui/CheckboxItem";

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

  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      setCheckedCategories([...checkedCategories, category]);
    } else {
      setCheckedCategories(checkedCategories.filter((cat) => cat !== category));
    }
  };

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
      <Modals
        open={open}
        setOpen={() => setOpen(!open)}
        title={title}
        position="bottom"
      >
        <View style={styles.modalContent}>
          <NumberInput
            label="Maximum Price Range"
            placeholder="Set maximum price range"
            min={1}
            max={100}
            value={maxPrice ? String(maxPrice) : ""}
            onChangeText={(value) => setMaxPrice(Number(value))}
          />
          <CheckboxItem
            label="T-shirts"
            isChecked={checkedCategories.includes("T-shirts")}
            onPress={(checked) => handleCheckboxChange("T-shirts", checked)}
          />
          <CheckboxItem
            label="Pants"
            isChecked={checkedCategories.includes("Pants")}
            onPress={(checked) => handleCheckboxChange("Pants", checked)}
          />
          <CheckboxItem
            label="Shoes"
            isChecked={checkedCategories.includes("Shoes")}
            onPress={(checked) => handleCheckboxChange("Shoes", checked)}
          />
          <CheckboxItem
            label="Hoodies"
            isChecked={checkedCategories.includes("Hoodies")}
            onPress={(checked) => handleCheckboxChange("Hoodies", checked)}
          />
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
    bottom: 40,
    right: 20,
  },
  modalContent: {
    marginTop: 15,
    flexDirection: "column",
    rowGap: 6,
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

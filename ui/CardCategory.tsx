import { bgColors, iconColors, titleCategories } from "@/libs/data";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Hoodie, Pants, Shoe, Tshirt } from "@/assets/icons";
import { Colors } from "@/constants/Colors";

type CategoryProps = {
  title: string;
  index: number;
};

export function CardCategory({ title, index }: CategoryProps) {
  const icons = [Tshirt, Pants, Shoe, Hoodie];
  const Icon = icons[index % icons.length];
  const iconColor = iconColors[index % iconColors.length];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <Link
      href={{
        pathname: "/category",
        params: { id: index + 1, title: title },
      }}
    >
      <View style={styles.cardCategory}>
        <View style={[styles.category, { backgroundColor: bgColor }]}>
          <Icon fill={iconColor} />
        </View>
        <Text style={styles.titleCardCategory}>{title}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardCategory: {
    flexDirection: "column",
    gap: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  titleCardCategory: {
    fontSize: 14,
    color: Colors.default.black,
  },
});

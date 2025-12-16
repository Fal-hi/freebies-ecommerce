import { bgColors, iconColors } from "@/libs/data";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import {
  Tshirt,
  Pants,
  Shoe,
  Hoodie,
  Underwear,
  Socks,
  Hat,
  Accessories,
  Star, // Fallback
  Search, // Fallback
} from "@/assets/icons";
import { Ionicons } from "@expo/vector-icons"; // Fallback for missing ones if needed

type CategoryProps = {
  title: string;
  index: number;
};

export function CardCategory({ title, index }: CategoryProps) {
  const { colors } = useTheme();

  // Mapping to Custom SVG components
  const getIcon = (t: string) => {
    switch (t) {
      case "T-shirts":
        return Tshirt;
      case "Pants":
        return Pants;
      case "Shoes":
        return Shoe;
      case "Hoodies":
        return Hoodie;
      case "Underwear":
        return Underwear;
      case "Socks":
        return Socks;
      case "Hats":
        return Hat;
      case "Accessories":
        return Accessories;
      default:
        return Star;
    }
  };

  const SelectedIcon = getIcon(title);
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
          {/* Custom icons usually take width/height/fill */}
          <SelectedIcon width="24" height="24" fill={iconColor} />
        </View>
        <Text style={[styles.titleCardCategory, { color: colors.text }]}>
          {title}
        </Text>
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
    textAlign: "center",
  },
});

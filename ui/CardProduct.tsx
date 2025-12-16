import { Discount, DotsThreeVertical, Star } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export type CardProductProps = {
  id: number;
  image: any;
  images: any[];
  title: string;
  category: string;
  price: number;
  sold: number;
  rating: number;
  reviewer: number;
  specialOffer?: number;
  totalProduct?: number;
  desc?: string;
  onPress?: () => void;
};

export function CardProduct({
  id,
  image,
  images,
  title,
  category,
  price,
  sold,
  rating,
  reviewer,
  specialOffer,
  totalProduct,
  desc,
  onPress,
}: CardProductProps) {
  const { colors } = useTheme();
  return (
    <Link
      href={{
        pathname: "/detail-product",
        params: {
          id,
          image,
          images: JSON.stringify(images),
          title,
          category,
          price,
          sold,
          rating,
          reviewer,
          specialOffer,
          totalProduct,
          desc,
        },
      }}
      style={styles.card}
      onPress={onPress}
    >
      <View style={[styles.cardProduct, { backgroundColor: colors.background === '#151718' ? '#222' : Colors.default.white }]}>
        {specialOffer && (
          <View style={styles.discount}>
            <Discount width="40" height="40" />
          </View>
        )}
        <Image source={image} style={styles.imageProduct} />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.cardBody}>
            {specialOffer ? (
              <View style={styles.cardSpecialOffer}>
                <Text style={styles.cardPrice}>${specialOffer}</Text>
                <Text style={styles.cardPriceBefore}>${price}</Text>
              </View>
            ) : (
              <Text style={styles.cardPrice}>${price}</Text>
            )}
            <Text style={styles.cardSold}>Sold: {sold}</Text>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.cardRating}>
              <Star />
              <Text style={[styles.cardRatingTotal, { color: colors.text }]}>{rating}</Text>
            </View>
            <Text style={[styles.cardReviewTotal, { color: colors.text }]}>{reviewer} Reviews</Text>
            <DotsThreeVertical fill={colors.text} />
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 225,
  },
  discount: {
    position: "absolute",
    right: 4,
    top: 4,
    zIndex: 10,
  },
  cardProduct: {
    position: "relative",
    backgroundColor: Colors.default.white,
    width: 175,
    padding: 10,

    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 10,
    borderRadius: 10,
  },
  imageProduct: {
    resizeMode: "center",
    margin: "auto",
    width: 150,
    height: 150,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 6,
  },
  cardPrice: {
    color: Colors.default.red,
    fontWeight: "500",
  },
  cardSpecialOffer: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 4,
  },
  cardPriceBefore: {
    color: Colors.default.gray,
    textDecorationLine: "line-through",
    fontWeight: "400",
    fontSize: 10,
  },
  cardSold: {
    backgroundColor: Colors.default.lightPurple,
    color: Colors.default.purple,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontSize: 8,
    borderRadius: 10,
  },
  cardContent: {
    marginTop: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    paddingRight: 6,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
    fontSize: 10,
  },
  cardRatingTotal: {
    fontSize: 12,
  },
  cardReviewTotal: {
    fontSize: 12,
  },
});

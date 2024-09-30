import { Discount, DotsThreeVertical, Star } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export type CardProductProps = {
  id: number;
  image: any;
  images: any[];
  title: string;
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
  price,
  sold,
  rating,
  reviewer,
  specialOffer,
  totalProduct,
  desc,
  onPress,
}: CardProductProps) {
  return (
    <Link
      href={{
        pathname: "/detail-product",
        params: {
          id,
          image,
          images: JSON.stringify(images),
          title,
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
      <View style={styles.cardProduct}>
        {specialOffer && (
          <View style={styles.discount}>
            <Discount width="40" height="40" />
          </View>
        )}
        <Image source={image} style={styles.imageProduct} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>
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
              <Text style={styles.cardRatingTotal}>{rating}</Text>
            </View>
            <Text style={styles.cardReviewTotal}>{reviewer} Reviews</Text>
            <DotsThreeVertical />
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
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
    borderRadius: 10,
    width: 180,
    padding: 10,
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
    fontSize: 10,
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

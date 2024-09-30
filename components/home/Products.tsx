import { Colors } from "@/constants/Colors";
import { CardProduct, CardProductProps } from "@/ui/CardProduct";
import { Href, Link } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type ProductsProps = {
  titleProduct: string;
  dataProduct: CardProductProps[];
  linkProducts: Href<string | object>;
};

export function Products({
  titleProduct,
  dataProduct,
  linkProducts,
}: ProductsProps) {
  let products = dataProduct;

  if (titleProduct === "Best Sellers") {
    products = dataProduct.sort((a, b) => b.sold - a.sold);
  } else if (titleProduct === "Special Offers") {
    products = dataProduct.filter((item) => item.specialOffer);
  }

  const scrollViewRef = useRef<ScrollView>(null);

  function handleCardPress() {
    // Scroll to the top of the ScrollView
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });

    // Navigate to the product detail page
    // Note: You may need to adjust this depending on how your navigation is set up
    // For example:
    // router.push(linkProducts);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerProduct}>
        <Text style={styles.titleProduct}>{titleProduct}</Text>
        {linkProducts ? (
          <Link href={linkProducts} style={styles.titleProductSeeAll}>
            See All
          </Link>
        ) : null}
      </View>
      <ScrollView
        horizontal
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.contentProduct}>
          {products.map(
            (
              {
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
              },
              index
            ) => (
              <CardProduct
                key={index}
                id={id}
                image={image}
                images={images}
                title={title}
                price={price}
                sold={sold}
                rating={rating}
                reviewer={reviewer}
                specialOffer={specialOffer}
                totalProduct={totalProduct}
                desc={desc}
                onPress={handleCardPress}
              />
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleProduct: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.default.black,
  },
  titleProductSeeAll: {
    color: Colors.default.blue,
    fontWeight: "500",
    fontSize: 14,
  },
  contentProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20,
    paddingVertical: 10,
  },
  cardProduct: {
    backgroundColor: Colors.default.white,
    borderRadius: 10,
    width: 200,
    padding: 10,
  },
  imageProduct: {
    resizeMode: "center",
    margin: "auto",
    width: 150,
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardPrice: {
    color: Colors.default.red,
    fontWeight: "500",
    marginTop: 2,
    marginBottom: 8,
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

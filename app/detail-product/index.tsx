import {
  CaretLeft,
  Cart,
  CartPlus,
  Discount,
  Star,
  Whishlist,
  WhishlistFill,
} from "@/assets/icons";
import { ImageSlider } from "@/components/detail-product/ImageSlider";
import { Products } from "@/components/home/Products";
import { Colors } from "@/constants/Colors";
import { cardProductData, dataCart, dataReviewers } from "@/libs/data";
import { Divider } from "@/ui/Divider";
import { Header } from "@/ui/Header";
import { UserComment } from "@/ui/UserComment";
import { Link, useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DetailProduct() {
  const [isFilled, setIsFilled] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const scaleValue = new Animated.Value(1);
  const params = useLocalSearchParams();
  const {
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
  }: any = params;
  const selectedReviewer = dataReviewers.find((item) => item.id === +id);

  function handlePressIn() {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setIsFilled(!isFilled);
  }
  const parsedImages = JSON.parse(images);

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Detail Product</Text>
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
      <ScrollView style={styles.content}>
        <View style={styles.containerDetailProduct}>
          {/* Card */}
          <View style={styles.boxImageProduct}>
            {specialOffer && (
              <View style={styles.discount}>
                <Discount width="40" height="40" />
              </View>
            )}
            <ImageSlider images={parsedImages} />
            <View style={styles.footerImage}>
              <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                  {isFilled ? <WhishlistFill /> : <Whishlist />}
                </Animated.View>
              </Pressable>
            </View>
          </View>
          {/* Card Content */}
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
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
                <Star width="16" height="16" />
                <Text style={styles.cardRatingTotal}>{rating}</Text>
                <Text style={styles.cardReviewTotal}>{reviewer} Reviews</Text>
              </View>
              <Text style={styles.totalProductAvailable}>
                Available: {totalProduct}
              </Text>
            </View>
          </View>
          <Divider style={styles.divider} width={"100%"} />
          {/* Product Description */}
          <View style={styles.containerProductDescription}>
            <Text style={styles.titleProductDescription}>
              Product Description
            </Text>
            <Text style={styles.contentProductDescription}>{desc}</Text>
          </View>
          {/* Reviews */}
          <View style={styles.containerReviews}>
            {/* Header Reviews */}
            <View style={styles.headerReviews}>
              <View>
                <Text style={styles.titleReviews}>Reviews ({reviewer})</Text>
                <View style={styles.cardRating}>
                  <Star width="20" height="20" />
                  <Text style={styles.ratingReview}>{rating}</Text>
                </View>
              </View>
              {selectedReviewer ? (
                <Link
                  href={{
                    pathname: "/detail-review",
                    params: {
                      id: selectedReviewer.id,
                      photo: selectedReviewer.photo,
                      name: selectedReviewer.name,
                      rating: selectedReviewer.rating,
                      date: selectedReviewer.date,
                      comment: selectedReviewer.comment,
                    },
                  }}
                  style={styles.titleSeeAllReviews}
                >
                  See All Reviews
                </Link>
              ) : (
                <Link href="/detail-review" style={styles.titleSeeAllReviews}>
                  See All Reviews
                </Link>
              )}
            </View>
            {/* Body Reviews */}
            <View style={styles.contentReviews}>
              {dataReviewers.map((item) => (
                <UserComment
                  key={item.id}
                  image={item.photo}
                  name={item.name}
                  rating={item.rating}
                  date={item.date}
                  comment={item.comment}
                />
              ))}
            </View>
          </View>
        </View>
        {/* Best Seller */}
        <View style={styles.containerBestSellers}>
          <Products
            titleProduct="Best Sellers"
            dataProduct={cardProductData}
            linkProducts="/best-seller"
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CartPlus width="28" height="28" />
        <Pressable style={styles.buttonBuy}>
          <Text style={styles.buttonBuyText}>Buy Product</Text>
        </Pressable>
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
  content: {
    paddingTop: 10,
  },
  containerDetailProduct: {
    backgroundColor: Colors.default.white,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
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
  boxImageProduct: {
    position: "relative",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  discount: {
    position: "absolute",
    right: 4,
    top: 4,
    zIndex: 10,
  },
  footerImage: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageProduct: {
    margin: "auto",
    width: 300,
    height: 300,
  },
  cardTitle: {
    flex: 1,
    fontSize: 25,
    fontWeight: "600",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 8,
  },
  cardSpecialOffer: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 8,
  },
  cardPriceBefore: {
    color: Colors.default.placeholder,
    textDecorationLine: "line-through",
    fontWeight: "400",
    fontSize: 16,
  },
  cardPrice: {
    color: Colors.default.red,
    fontWeight: "500",
    fontSize: 20,
  },
  cardSold: {
    backgroundColor: Colors.default.lightPurple,
    color: Colors.default.purple,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontSize: 12,
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
    columnGap: 4,
  },
  cardRatingTotal: {
    fontSize: 14,
  },
  cardReviewTotal: {
    fontSize: 14,
    marginLeft: 10,
  },
  totalProductAvailable: {
    backgroundColor: Colors.default.lightGreen,
    color: Colors.default.oldGreen,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 100,
    fontSize: 12,
    fontWeight: "600",
  },
  containerProductDescription: {},
  titleProductDescription: {
    fontSize: 18,
    fontWeight: "500",
  },
  contentProductDescription: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  divider: {
    marginVertical: 20,
  },
  containerReviews: {
    marginTop: 20,
  },
  headerReviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  titleSeeAllReviews: {
    color: Colors.default.blue,
    fontWeight: "500",
    fontSize: 14,
    marginTop: 4,
  },
  titleReviews: {
    fontSize: 18,
    fontWeight: "500",
  },
  ratingReview: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentReviews: {
    marginTop: 20,
    flexDirection: "column",
    rowGap: 20,
  },
  containerBestSellers: {
    marginTop: 40,
    paddingVertical: 20,
    backgroundColor: Colors.default.gray2,
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonBuy: {
    backgroundColor: Colors.default.blue,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonBuyText: {
    fontWeight: "500",
    color: Colors.default.white,
    fontSize: 16,
  },
});

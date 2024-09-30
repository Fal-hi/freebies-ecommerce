import { CaretLeft, Star } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Header } from "@/ui/Header";
import { UserComment } from "@/ui/UserComment";
import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import * as Progress from "react-native-progress";
import { dataReviewers } from "@/libs/data";

type RatingStarProps = {
  rating: number;
  progress: number;
  total: number;
};

export default function DetailReview() {
  const params = useLocalSearchParams();
  const { id, photo, name, rating, date, comment }: any = params;

  function RatingStar({ rating, progress, total }: RatingStarProps) {
    return (
      <View style={styles.ratingRightContent}>
        <StarRating
          rating={rating}
          onChange={() => {}}
          color={Colors.default.yellow}
          emptyColor={Colors.default.line}
          starSize={25}
          starStyle={{ marginRight: -4 }}
        />
        <Progress.Bar
          width={100}
          height={6}
          color={Colors.default.yellow}
          borderColor={Colors.default.white}
          unfilledColor={Colors.default.divider}
          progress={progress}
        />
        <Text>{total}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Review Product</Text>
        <View style={styles.cardRating}>
          <Star width="20" height="20" />
          <Text style={styles.ratingReview}>{rating}</Text>
        </View>
      </Header>
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.containerRating}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingTotal}>
              <Text style={styles.ratingTotalHighlight}>{rating}</Text> / 5
            </Text>
            <Text style={styles.ratingTotalReview}>86 Reviews</Text>
          </View>
          <View style={styles.ratingRight}>
            <RatingStar rating={5} progress={0.8} total={70} />
            <RatingStar rating={4} progress={0.3} total={5} />
            <RatingStar rating={3} progress={0.4} total={8} />
            <RatingStar rating={2} progress={0.1} total={2} />
            <RatingStar rating={1} progress={0.1} total={1} />
          </View>
        </View>
        {dataReviewers.map(({ id, photo, name, rating, date, comment }) => (
          <UserComment
            key={id}
            image={photo}
            name={name}
            rating={rating}
            date={date}
            comment={comment}
          />
        ))}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "column",
    rowGap: 20,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  ratingReview: {
    fontSize: 16,
    fontWeight: "500",
  },
  containerRating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
    marginBottom: 10,
  },
  ratingLeft: {
    marginTop: -8,
  },
  ratingTotal: {
    fontSize: 20,
  },
  ratingTotalHighlight: {
    fontWeight: "500",
    fontSize: 40,
  },
  ratingTotalReview: {
    fontSize: 16,
  },
  ratingRight: {},
  ratingRightContent: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.default.divider,
  },
});

import { Star } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { formatDate } from "@/utils/formatDate";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";

type UserCommentProps = {
  image: ImageSourcePropType;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

export function UserComment({
  image,
  name,
  rating,
  date,
  comment,
}: UserCommentProps) {
  return (
    <View style={styles.bodyReviews}>
      <Image source={image} style={styles.imageReview} />
      <View style={styles.contentUser}>
        <View style={styles.headerUser}>
          <View>
            <Text style={styles.nameReview}>{name}</Text>
            <StarRating
              rating={rating}
              onChange={() => {}}
              color={Colors.default.yellow}
              emptyColor={Colors.default.line}
              starSize={20}
              starStyle={{ marginRight: -4 }}
              style={{ marginLeft: -6, marginTop: 2 }}
            />
          </View>
          <Text style={styles.dateReview}>{formatDate(date)}</Text>
        </View>
        <Text numberOfLines={3} style={styles.commentUser}>
          {comment}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyReviews: {
    flexDirection: "row",
    columnGap: 15,
    width: "100%",
  },
  imageReview: {
    resizeMode: "cover",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  contentUser: {
    width: "82%",
  },
  headerUser: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameReview: {
    fontSize: 16,
    fontWeight: "500",
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    marginTop: 2,
  },
  totalStar: {
    fontSize: 14,
  },
  commentUser: {
    lineHeight: 20,
    marginTop: 6,
  },
  dateReview: {
    color: Colors.default.gray,
    textAlign: "right",
    fontSize: 12,
    marginTop: 4,
  },
});

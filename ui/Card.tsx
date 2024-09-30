import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

type CardProps = {
  title: string;
  date: string;
  image: any;
  style?: object;
};

export function Card({ title, date, image, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>
        <Text style={styles.titleContent}>{title}</Text>
        <Text style={styles.dateContent}>Periode {date}</Text>
      </View>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: 170,
    width: 340,
    position: "relative",
  },
  content: {
    backgroundColor: Colors.default.blue,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    width: 200,
    height: 167,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
  },
  titleContent: {
    color: Colors.default.white,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  dateContent: {
    color: Colors.default.white,
    fontSize: 10,
    fontWeight: "400",
  },
  image: {
    height: 167,
    width: 250,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: "absolute",
    right: 0,
  },
  cards: {
    marginRight: 15,
  },
  lastCard: {
    marginRight: 0,
  },
});

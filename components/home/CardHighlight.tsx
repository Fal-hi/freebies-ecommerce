import { ArrowRight } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Href, Link, router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CardHighlightProps = {
  title: string;
  image: any;
  link: Href<string | object>;
  bgColor?: string;
};

export function CardHighlight({
  bgColor,
  title,
  image,
  link,
}: CardHighlightProps) {
  return (
    <Pressable onPress={() => router.push(link)}>
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.link}>
            <Text style={styles.linkTitle}>Shop Now</Text>
            <ArrowRight width="16" height="16" fill="#fff" />
          </View>
        </View>
        <Image source={image} style={styles.image} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: Colors.default.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  title: {
    color: Colors.default.white,
    fontSize: 22,
    width: 180,
    fontWeight: "600",
  },
  contentContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    color: Colors.default.white,
  },
  linkTitle: {
    color: Colors.default.white,
    fontWeight: "400",
  },
  image: {
    width: 150,
    height: 150,
    shadowColor: Colors.default.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

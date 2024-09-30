import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { bgColors, iconColors, titleCategories } from "@/libs/data";
import { Link, useLocalSearchParams } from "expo-router";
import { CardCategory } from "@/ui/CardCategory";

type CategoryProps = {
  title: string;
  index: number;
};

export function Categories() {
  const { post } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.titleContent}>Categories</Text>
      <View style={styles.content}>
        {titleCategories.map(({ id, title }, index) => (
          <CardCategory key={id} title={title} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  titleContent: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 20,
    color: Colors.default.black,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

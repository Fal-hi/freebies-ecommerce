import { cardData } from "@/libs/data";
import { Card } from "@/ui/Card";
import { ScrollView, StyleSheet } from "react-native";

export function Cards() {
  return (
    <ScrollView
      horizontal
      alwaysBounceHorizontal
      showsHorizontalScrollIndicator={false}
    >
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          date={item.date}
          image={item.image}
          style={index === cardData.length - 1 ? styles.lastCard : styles.card}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 15,
  },
  lastCard: {
    marginRight: 0,
  },
});

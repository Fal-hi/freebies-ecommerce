import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Carousel from "react-native-snap-carousel";

export function ImageSlider({ images }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.source} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        layout={"default"}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Text style={styles.photoInfo}>{`${activeIndex + 1}/${
        images.length
      } Photos`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    margin: "auto",
  },
  photoInfo: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
});

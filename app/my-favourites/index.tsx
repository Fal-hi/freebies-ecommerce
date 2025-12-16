import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { CardProduct } from "@/ui/CardProduct";
import { Header } from "@/ui/Header";
import { router } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useFavorite } from "@/context/FavoriteContext";

export default function MyFavouritesScreen() {
  const { colors } = useTheme();
  const { favorites } = useFavorite();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} fill={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Favourites</Text>
        <View style={{ width: 16 }} />
      </Header>
      <ScrollView contentContainerStyle={[styles.content, { backgroundColor: colors.background === '#151718' ? '#000' : Colors.default.gray2 }]}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>No favorites yet.</Text>
          </View>
        ) : (
          <View style={styles.productsContainer}>
            {favorites.map((item, index) => (
              <CardProduct
                key={index}
                id={item.id}
                image={item.image}
                images={item.images}
                title={item.title}
                category={item.category}
                price={item.price}
                specialOffer={item.specialOffer}
                sold={item.sold}
                rating={item.rating}
                reviewer={item.reviewer}
              />
            ))}
          </View>
        )}
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
  content: {
    padding: 20,
    backgroundColor: Colors.default.gray2,
    flexGrow: 1,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

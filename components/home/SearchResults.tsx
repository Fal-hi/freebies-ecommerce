import { CardProduct } from "@/ui/CardProduct";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Product = {
  id: number;
  image: any;
  images: any[];
  title: string;
  category: string;
  price: number;
  sold: number;
  rating: number;
  reviewer: number;
  specialOffer?: number;
  totalProduct?: number;
  desc?: string;
};

type SearchResultsProps = {
  products: Product[];
  searchQuery: string;
};

export function SearchResults({ products, searchQuery }: SearchResultsProps) {
  const { colors } = useTheme();

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="search-outline"
          size={64}
          color={Colors.default.placeholder}
        />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          No Products Found
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.icon }]}>
          We couldn't find any products matching "{searchQuery}"
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.resultCount, { color: colors.icon }]}>
        Found {products.length} product{products.length > 1 ? "s" : ""}
      </Text>
      <View style={styles.productsGrid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <CardProduct
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              images={product.images}
              category={product.category}
              rating={product.rating}
              sold={product.sold}
              reviewer={product.reviewer}
              specialOffer={product.specialOffer}
              totalProduct={product.totalProduct}
              desc={product.desc}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  resultCount: {
    fontSize: 14,
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  productItem: {
    width: "48%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});

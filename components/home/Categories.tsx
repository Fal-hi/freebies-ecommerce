import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { titleCategories } from "@/libs/data";
import { useLocalSearchParams } from "expo-router";
import { CardCategory } from "@/ui/CardCategory";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export function Categories() {
  const { colors, theme } = useTheme();
  const { post } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  // Show only first 4 items
  const displayedCategories = titleCategories.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.titleContent, { color: colors.text }]}>
          Categories
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {displayedCategories.map(({ id, title }, index) => (
          <CardCategory key={id} title={title} index={index} />
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                All Categories
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalGrid}>
              {titleCategories.map(({ id, title }, index) => (
                <View key={id} style={styles.modalItem}>
                  <CardCategory title={title} index={index} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContent: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.default.black,
  },
  seeAll: {
    color: Colors.default.blue,
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.default.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  modalItem: {
    width: "21%", // Fits 4 items with gap
    alignItems: "center",
  },
});

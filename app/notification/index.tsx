import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { dataNotifications } from "@/libs/data";
import { Header } from "@/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export default function NotificationScreen() {
  const { colors, theme, defaultColors } = useTheme();

  const screenBg =
    theme === "light" ? Colors.default.white : Colors.default.black;
  const cardBg =
    theme === "light" ? Colors.default.white : Colors.default.black;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: screenBg }]}>
      <Header>
        <CaretLeft
          width="16"
          height="16"
          onPress={() => router.back()}
          fill={colors.text}
        />
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notification
        </Text>
        <View style={{ width: 16 }} />
      </Header>
      <ScrollView>
        {/* Notification Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: cardBg,
              shadowColor: colors.text,
              marginTop: 20,
              paddingVertical: 10,
            },
          ]}
        >
          {dataNotifications.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.notificationItem,
                index !== dataNotifications.length - 1 && {
                  borderBottomColor:
                    theme === "light" ? Colors.default.gray2 : "#333",
                  borderBottomWidth: 1,
                },
                !item.isRead && {
                  backgroundColor:
                    theme === "light" ? Colors.default.lightGreen : "#1F2223",
                },
              ]}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        theme === "light"
                          ? Colors.default.blue
                          : Colors.default.black,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={defaultColors.white}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <Text
                    style={[styles.notificationTitle, { color: colors.text }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.notificationDesc, { color: colors.icon }]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={[styles.notificationDate, { color: colors.icon }]}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginHorizontal: -10,
    borderRadius: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
  },
});

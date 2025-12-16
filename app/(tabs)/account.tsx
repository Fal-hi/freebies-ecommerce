import { useTheme } from "@/context/ThemeContext";
import { profileMenu } from "@/libs/data";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "@/context/UserContext";
import { MainLayout } from "@/components/MainLayout";

export default function AccountUser() {
  const { colors, defaultColors } = useTheme();
  const { user } = useUser();

  return (
    <MainLayout>
      <ScrollView>
        {/* Profile Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.background, shadowColor: colors.text },
          ]}
        >
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: colors.text }]}>
                {user.name}
              </Text>
              <Text style={[styles.email, { color: colors.icon }]}>
                {user.email}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/profile-details")}>
              <Ionicons
                name="create-outline"
                size={24}
                color={defaultColors.blue}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              shadowColor: colors.text,
              marginTop: 20,
              paddingVertical: 10,
            },
          ]}
        >
          {profileMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.route as Href)}
            >
              <View style={styles.menuLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: defaultColors.blue,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={defaultColors.white}
                  />
                </View>
                <Text style={[styles.menuText, { color: colors.text }]}>
                  {item.title}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

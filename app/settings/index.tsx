import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Header } from "@/ui/Header";
import { router } from "expo-router";
import { useState } from "react";
import { StatusBar, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { theme, toggleTheme, colors, defaultColors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header>
        <CaretLeft
          width="16"
          height="16"
          onPress={() => router.back()}
          fill={colors.text}
        />
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Settings
        </Text>
        <View style={{ width: 16 }} />
      </Header>
      <View style={styles.content}>
        <View
          style={[
            styles.settingItem,
            { borderBottomColor: colors.tabIconDefault },
          ]}
        >
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Push Notifications
          </Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: defaultColors.gray, true: defaultColors.blue }}
            thumbColor={defaultColors.white}
          />
        </View>
        <View
          style={[
            styles.settingItem,
            { borderBottomColor: colors.tabIconDefault },
          ]}
        >
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Dark Mode
          </Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: defaultColors.gray, true: defaultColors.blue }}
            thumbColor={defaultColors.white}
          />
        </View>
        <View
          style={[
            styles.settingItem,
            { borderBottomColor: colors.tabIconDefault },
          ]}
        >
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Location Service
          </Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: defaultColors.gray, true: defaultColors.blue }}
            thumbColor={defaultColors.white}
          />
        </View>
      </View>
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
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.default.divider,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.default.black,
    fontWeight: "500",
  },
});

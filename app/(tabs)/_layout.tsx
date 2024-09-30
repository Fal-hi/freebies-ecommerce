import { Home, User } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ focused }) => (
            <View>
              <Home fill={focused ? "#3669C9" : "#0C1A30"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "ACCOUNT",
          tabBarIcon: ({ focused }) => (
            <User fill={focused ? "#3669C9" : "#0C1A30"} />
          ),
        }}
      />
      <Tabs.Screen
        name="another"
        options={{
          title: "ANOTHER",
          tabBarIcon: ({ focused }) => (
            <User fill={focused ? "#3669C9" : "#0C1A30"} />
          ),
        }}
      />
    </Tabs>
  );
}

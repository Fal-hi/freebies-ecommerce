import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainHeader } from "@/components/MainHeader";

type MainLayoutProps = {
  children?: ReactNode;
  showHeader?: boolean;
  style?: ViewStyle;
};

export function MainLayout({
  children,
  showHeader = true,
  style,
}: MainLayoutProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      {showHeader && <MainHeader />}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

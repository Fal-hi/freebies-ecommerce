import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: Colors.default.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

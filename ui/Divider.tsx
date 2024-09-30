import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

type DividerProps = {
  width?: number | string;
  style?: object;
};

export function Divider({ width = 330, style }: DividerProps) {
  return <View style={[styles.container, style, { width: width }]} />;
}

const styles = StyleSheet.create({
  container: {
    height: 0.5,
    backgroundColor: Colors.default.line,
  },
});

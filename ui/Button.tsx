import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  title: string;
  style?: object;
  styleTitle?: object;
  [key: string]: any;
};

export function Button({ title, style, styleTitle, ...props }: ButtonProps) {
  return (
    <Pressable style={[styles.container, style]} {...props}>
      <Text style={[styles.title, styleTitle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

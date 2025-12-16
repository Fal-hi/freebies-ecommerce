import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type CheckboxItemProps = {
  label: string;
  isChecked: boolean;
  onPress: (checked: boolean) => void;
  fillColor?: string;
  size?: number;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export function CheckboxItem({
  label,
  isChecked,
  onPress,
  fillColor,
  size = 25,
  labelStyle,
  containerStyle,
}: CheckboxItemProps) {
  const { colors, defaultColors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: colors.text }, labelStyle]}>
        {label}
      </Text>
      <View style={styles.checkboxWrapper}>
        <BouncyCheckbox
          size={size}
          fillColor={fillColor || defaultColors.blue}
          unFillColor={colors.background}
          innerIconStyle={{
            borderWidth: 1,
            borderColor: Colors.default.line,
          }}
          isChecked={isChecked}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  checkboxWrapper: {
    marginRight: -17,
  },
});

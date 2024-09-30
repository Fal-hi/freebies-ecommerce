import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

type NumberInputProps = {
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  onChangeText: (value: any) => void;
  value?: any;
  style?: object;
};

export function NumberInput({
  label,
  placeholder,
  min = 0,
  max = 1000,
  onChangeText,
  value,
  style,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (text: string) => {
    const numericValue = parseInt(text, 10);

    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      setInputValue(text);
    } else if (text === "") {
      setInputValue("");
    }

    onChangeText(numericValue);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={Colors.default.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 10,
  },
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: Colors.default.line,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: 330,
  },
});

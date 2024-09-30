/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  default: {
    blue: "#3669C9",
    red: "#FE3A30",
    yellow: "#FFC120",
    purple: "#9B81E5",
    lightPurple: "#F1EDFC",
    lightGreen: "#EEFAF6",
    green: "#0ACF83",
    oldGreen: "#3A9B7A",
    black: "#0C1A30",
    white: "#FFF",
    gray: "#838589",
    gray2: "#FAFAFA",
    placeholder: "#C4C5C4",
    line: "#C4C5C4",
    divider: "#EDEDED",
  },
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

import { ChakraProvider, type ThemeConfig } from "@chakra-ui/react";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({ colors });

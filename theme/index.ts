import { extendTheme, StyleConfig, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#B3E5FC",
    200: "#81D4FA",
    300: "#4FC3F7",
    400: "#29B6F6",
    500: "#0293D5",
    600: "#0077B6",
    700: "#005691",
    800: "#003366",
    900: "#001A29",
  },
};

const components: Record<string, StyleConfig> = {
  Button: {
    variants: {
      outline: (props) => ({
        borderColor: "primary.500",
        color: "primary.500",
        _hover: {
          backgroundColor: props.colorMode === "dark" ? "gray.700" : "gray.100",
          color: props.colorMode === "dark" ? "white" : "primary.500",
        },
      }),
      solid: {
        backgroundColor: "primary.500",
        color: "white",
        _hover: {
          backgroundColor: "primary.700",
        },
      },
      solid_secondary: {
        backgroundColor: "gray.700",
        color: "white",
        _hover: {
          backgroundColor: "gray.500",
        },
      },
    },
  },
  Heading: {
    baseStyle: (props) => ({
      color: props.colorMode === "dark" ? "white" : "gray.700",
    }),
  },
  Link: {
    baseStyle: {
      _hover: {
        opacity: 0.7,
        textDecoration: "none",
      },
    },
  },
  Spinner: {
    baseStyle: (props) => ({
      color: props.colorMode === "dark" ? "primary.400" : "primary.500",
    }),
  },
  Text: {
    baseStyle: (props) => ({
      color: props.colorMode === "dark" ? "white" : "gray.700",
    }),
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ colors, components, config });

export default theme;

import { colors } from "./colors";
import { fonts } from "./fonts";
import { typography } from "./typography";

export const theme = {
  colors,
  fonts,
  typography,
};

export type ThemeType = typeof theme;
export default theme;

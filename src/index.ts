import {fontFamily} from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin";
import { getRadixColorScales, getRadixPaletteObject } from "./tokens/colors";
import { getRadiusVariables } from "./tokens/radius";
import {
  createCustomVariableFromScale,
  BitTailwindPluginOptions,
  getPluginOptions,
  HandlerParamType,
  ThemeParamType
} from "./utils";
import {typography} from "./tokens/typography";
const handler: HandlerParamType = (options) => {
  const { prefix, scaling, radius, neutral, accent } = getPluginOptions(options);
  return function ({ addBase, addUtilities }) {
    const [light, dark, alpha, darkAlpha] = getRadixColorScales(neutral);
    const [accentLight, accentDark, accentAlpha, accentDarkAlpha] = getRadixColorScales(accent);
    // 1a. Add styles to base layer
    addBase([
      // Josh Comeau rest
      {
        "*,*::before,*::after": { boxSizing: "border-box" },
        "*": { margin: "0" },
        "html,body": { height: "100%", fontSize: "16px" },
        body: { lineHeight: String(1.5), WebkitFontSmoothing: "antialiased" },
        "img,picture,video,canvas,svg": {
          display: "block",
          maxWidth: "100%",
        },
        "input,button,textarea,select": { font: "inherit" },
        "p,h1,h2,h3,h4,h5,h6": { overflowWrap: "break-word" },
        "#root,#__next": { isolation: "isolate" },
      },
      // palette CSS variables
      {
        ":root": {
          ...createCustomVariableFromScale(prefix, "neutral", light),
          ...createCustomVariableFromScale(prefix, "neutral-alpha", alpha),
          ...createCustomVariableFromScale(prefix, "accent", accentLight),
          ...createCustomVariableFromScale(prefix, "accent-alpha", accentAlpha),
          [`--${prefix}-black`]: light[`${neutral}12`]
        },
        ".dark": {
          ...createCustomVariableFromScale(prefix, "neutral", dark),
          ...createCustomVariableFromScale(prefix, "neutral-alpha", darkAlpha),
          ...createCustomVariableFromScale(prefix, "accent", accentDark),
          ...createCustomVariableFromScale(prefix, "accent-alpha", accentDarkAlpha),
          [`--${prefix}-black`]: dark[`${neutral}1`]
        },
      },
      // TODO: semantic CSS variables
      {
        ":root": {
          ...getRadiusVariables(prefix, Number(scaling), radius),
          [`--${prefix}-page-background`]: `white`,
          [`--${prefix}-text-color`]: `var(--${prefix}-neutral-12)`,
          [`--${prefix}-background`]: `var(--${prefix}-neutral-1)`,
          [`--${prefix}-text-color`]: `var(--${prefix}-neutral-12)`,
          [`--${prefix}-text-accent-color`]: `var(--${prefix}-accent-12)`,
          [`--${prefix}-text-accent-muted`]: `var(--${prefix}-accent-10)`,
          [`--${prefix}-text-muted`]: `var(--${prefix}-neutral-11)`,
          [`--${prefix}-bg-muted`]: `var(--${prefix}-neutral-3)`,
          [`--${prefix}-bg-muted-hover`]: `var(--${prefix}-neutral-4)`,
          [`--${prefix}-bg-accent`]: `var(--${prefix}-accent-9)`,
          [`--${prefix}-bg-accent-muted`]: `var(--${prefix}-accent-alpha-3)`,
          [`--${prefix}-bg-accent-muted-hover`]: `var(--${prefix}-accent-alpha-5)`,
          [`--${prefix}-border`]: `var(--${prefix}-neutral-7)`,
          [`--${prefix}-ring`]: `var(--${prefix}-accent-8)`,
        },
        ".dark": {
          [`--${prefix}-page-background`]: `var(--${prefix}-neutral-1)`,
        },
      },
      // global typography styles
      {
        body: { "@apply text-foreground": {} },

        "h1,h2,h3,h4,h5,h6": { "@apply mb-8": {} },
        "h1,.h1": { "@apply text-h1": {} },
        "h2,.h2": { "@apply text-h2": {} },
        "h3,.h3": { "@apply text-h3": {} },
        "h4,.h4": { "@apply text-h4": {} },
        "h5,.h5": { "@apply text-h5": {} },
        "h6,.h6": { "@apply text-h6": {} },
        "small,.small": { "@apply text-mini": {} },
        p: {
          "@apply my-8": {},
          "&:last-child,  &:first-child": { marginTop: "0", marginBottom: "0" },
          "+ p": { marginTop: "0" },
        },
        "p,ul,ol,blockquote": { "@apply leading-6": {} },
      },
      {
        body: {
          "@apply selection:bg-accent-9 selection:text-black bg-background text-foreground": {},
        },
      },
    ]);
    // TODO: 1a. Add utility classes
    addUtilities([
      {
        ".wrap": {
          "@apply container my-0 mx-auto w-full": {},
        },
        ".wrap-sm": {
          "@apply max-w-3xl": {},
        },
        ".wrap-px": {
          "@apply px-8": {},
        },
        ".wrap-lg": {
          "@apply max-w-7xl": {},
        },
        ".wrap-md": {
          "@apply max-w-4xl": {},
        },
      },
      {
        ".block-m": {
          "@apply my-24": {},
        },
        ".block-p": {
          "@apply py-24": {},
        },
      },
      {
        ".align--left": {
          "@apply mr-auto justify-start": {},
        },
        ".align--right": {
          "@apply ml-auto justify-end": {},
        },
        ".align--center": {
          "@apply m-auto justify-center": {},
        },
      },
      {
        ".show": {
          "@apply block": {},
        },
        ".hide": {
          "@apply hidden": {},
        },
      },
      {
        ".card-clip": {
          clipPath: "inset(4px round 40px)",
          "&:hover": { clipPath: "inset(0px round 44px)" },
        },
      },
    ]);
  };
};

const theme: ThemeParamType = (options) => {
  const { prefix } = getPluginOptions(options);
  return {
    theme: {
      extend: {
        colors: {
          black: `var(--${prefix}-black)`,
          neutral: getRadixPaletteObject(prefix, "neutral"),
          accent: getRadixPaletteObject(prefix, "accent"),
          //  semantic classes
        },
        textColor: {
          foreground: `var(--${prefix}-text-color)`,
          muted: `var(--${prefix}-text-muted)`,
        },
        borderRadius: {
          DEFAULT: `var(--${prefix}-radius-2)`,
          sm: `var(--${prefix}-radius-1)`,
          md: `var(--${prefix}-radius-2)`,
          lg: `var(--${prefix}-radius-3)`,
          xl: `var(--${prefix}-radius-4)`,
          "2xl": `var(--${prefix}-radius-5)`,
          "3xl": `var(--${prefix}-radius-6)`,
        },
        backgroundColor: {
          background: `var(--${prefix}-page-background)`,
        },
        borderColor: {
          DEFAULT: `var(--${prefix}-border)`,
        },
        fontFamily: {
          sans: ["Guminert", ...fontFamily.sans],
          title: ["Alternox", ...fontFamily.sans],
        },
        fontSize: {
          body: [
            "1rem",
            {
              lineHeight: "1.5rem",
            },
          ],
          h1: [
            "3.5rem",
            {
              lineHeight: "3.75rem",
            },
          ],
          h2: [
            "2.25rem",
            {
              lineHeight: "2.625rem",
            },
          ],
          h3: [
            "1.875rem",
            {
              lineHeight: "2.25rem",
            },
          ],
          h4: [
            "1.5rem",
            {
              lineHeight: "2rem",
            },
          ],
          h5: [
            "1.25rem",
            {
              lineHeight: "1.75rem",
            },
          ],
          h6: [
            "1.125rem",
            {
              lineHeight: "1.5rem",
            },
          ],
          mini: [
            "0.75rem",
            {
              lineHeight: "1.5rem",
            },
          ],
        },
        typography,
      },
    },
  }
};
export const creightivePlugin = plugin.withOptions<Partial<BitTailwindPluginOptions>>(handler, theme);
export default creightivePlugin

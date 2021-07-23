// import styleOverrides from './styleOverrides';
// import propOverrides from './propOverrides';

/* Add your custom theme definitions below. Anything that is supported in UI-Kit Theme can be
 overridden and/or customized here! */

/* Base colors.
 * These get used by theme types (see /types directory) to color
 * specific parts of the interface. For more control on how certain
 * elements are colored, go there. The next level of control comes
 * on a per-component basis with "overrides"
 */
const lightColors = {
  primary: '#20242B',
  secondary: '#ABA7A5',
  tertiary: '#EFECEA',
};

const darkColors = {
  primary: '#EFECEA',
  secondary: '#ABA7A5',
  tertiary: '#EFECEA',
};

const typography = {
  // baseFontSize: 18,
  // baseLineHeight: 27, // 1.5 ratio
  sans: {
    regular: {
      default: 'Realist-Regular',
      italic: 'Realist-RegularItalic',
    },
    medium: {
      default: 'Realist-Medium',
      italic: 'Realist-MediumItalic',
    },
    bold: {
      default: 'Realist-Bold',
      italic: 'Realist-BoldItalic',
    },
    black: {
      default: 'Realist-Bold',
      italic: 'Realist-BoldItalic',
    },
  },
};

const types = {
  // light: {
  //   colors: {
  //     primary: '#20242B',
  //     secondary: '#ABA7A5',
  //     tertiary: '#EFECEA',
  //   },
  // },
  dark: {
    colors: {
      action: {
        primary: '#ABA7A5',
        // default: 'green',
        // secondary: 'blue',
      },
    },
  },
};

/* Base Typography sizing and fonts.
 * To control speicfic styles used on different type components (like H1, H2, etc), see "overrides"
 */
// const typography = {};

/* Responsive breakpoints */
// export const breakpoints = {};

/* Base sizing units. These are used to scale
 * space, and size components relatively to one another.
 */
// export const sizing = {};

/* Base alpha values. These are used to keep transparent values across the app consistant */
// export const alpha = {};

/* Base overlays. These are used as configuration for LinearGradients across the app */
// export const overlays = () => ({});

/* Overrides allow you to override the styles of any component styled using the `styled` HOC. You
 * can also override the props of any component using the `withTheme` HOC. See examples below:
 * ```const StyledComponent = styled({ margin: 10, padding: 20 }, 'StyledComponent');
 *    const PropsComponent = withTheme(({ theme }) => ({ fill: theme.colors.primary }), 'PropsComponent');
 * ```
 * These componnents can have their styles/props overriden by including the following overrides:
 * ```{
 *   overides: {
 *     StyledComponent: {
 *       margin: 5,
 *       padding: 15,
 *     },
 *     // #protip: you even have access 👇to component props! This applies to style overrides too 💥
 *     PropsComponent: () => ({ theme, isActive }) => ({
 *       fill: isActive ? theme.colors.secondary : theme.colors.primary,
 *     }),
 *   },
 * }
 * ```
 */

const overrides = {
  'ui-onboarding.Landing.BrandIcon': (theme) => ({
    fill: theme.colors.secondary,
  }),
  ScriptureText: (theme) => ({
    fontSize: theme.helpers.rem(1.25),
    lineHeight: theme.helpers.verticalRhythm(1.5, 1.625),
  }),
};

export default { lightColors, darkColors, overrides, typography, types };

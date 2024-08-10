import { createGlobalStyle, DefaultTheme } from "styled-components";

// Tema tipini genişletiyoruz
declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      main: string;
    };
    colors: {
      background: string;
      text: string;
    };
  }
}

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default GlobalStyle;

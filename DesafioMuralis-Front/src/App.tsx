import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globals";
import { DefaultTheme } from "./styles/themes/default";
import { Router } from "./Router";
import { ClientsContextProvider } from "./contexts/ClientsContext";


export function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
        <ClientsContextProvider>
          <Router />
        </ClientsContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}


import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${props => props.theme.gray1};
        color: ${props => props.theme.baseTitle};
    }

    :focus {
        outline: transparent;
        box-shadow: 0 0 0 2px ${props => props.theme.orangeMuralis};
    }

    body, input, text-area, button {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        font-weight: 400;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
    }

`
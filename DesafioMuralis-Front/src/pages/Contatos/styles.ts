import styled from "styled-components";

export const MainContainer = styled.main `
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 4rem 2rem;

    gap: 1rem;

    > div:first-child {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    > div:first-child > strong {
        font-size: 4rem;
        font-weight: bold;
    }
`

export const Button = styled.button `
    display: flex;
    align-items: center;
    gap: 0.25rem;

    padding: 0.5rem 1rem;

    color: ${props => props.theme.orangeMuralis};
    border: solid 1px ${props => props.theme.orangeMuralis};

    border-radius: 6px;

    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.orangeMuralis};
        color: ${props => props.theme.white};
    }
`

export const TableContainer = styled.div `
    flex: 1;
    max-height: calc(100vh - 17rem);
    overflow: auto; 
    width: 100%;
`
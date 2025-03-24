import styled from "styled-components";
import * as RadioGroup from '@radix-ui/react-radio-group'

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
    max-height: calc(100vh - 21rem); 
    overflow: auto; 
    width: 100%;
`


export const SearchBar = styled.div `
    width: 100%;

    display: flex;
    align-items: center;

    border-radius: 6px;
    padding: 0px;
    border: solid 1px ${props => props.theme.tableHeadGray};
    background-color: ${props => props.theme.inputGray};
`

export const SearchField = styled.form `
    display: flex;
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.inputGray};
    border-radius: 6px;
    gap: 0.5rem;

    > input {
        flex: 1;

        padding: 1rem;
        border-top-left-radius: 6px;
        border-top-left-radius: 6px;
        border: 0;
        background-color: ${props => props.theme.inputGray};
        &::placeholder {
            color: ${props => props.theme.placeholder};
        }
    }

    > button {
        display: flex;
        justify-content: center;
        align-items: center;

        border: 0;
        background-color: ${props => props.theme.inputGray};
        margin: 1rem;
        color: ${props => props.theme.placeholder};

        height: min-content;
        border-radius: 6px;
        cursor: pointer;
    }

`

export const FilterOptionContainer = styled(RadioGroup.Root)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.inputGray};
    border-radius: 6px;
    border: solid 1px ${props => props.theme.tableHeadGray};
` 

export const OptionButton = styled(RadioGroup.Item)`
    background-color: ${props => props.theme.inputGray};

    max-width: 77px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 0;
    background: transparent;
    cursor: pointer;

    padding: 1rem;
    border-radius: 6px;


    &[data-state="checked"] {
        background-color: ${({ theme }) => theme.tableHeadGray}; /* Cor ativa */
    }
`
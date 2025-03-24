import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);

`

export const Content = styled(Dialog.Content)`
    min-width: 50rem;
    border-radius: 6px;
    background: ${props => props.theme.white};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > div:first-child {
        background-color: ${props => props.theme.blueMuralis};
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding: 1.5rem;
    }

`

export const HeaderContent = styled.header `
    color: ${props => props.theme.white};
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;

    > button {
        display: flex;
        align-items: center;
        justify-content: center;

        background: transparent;
        border: 0;
    }

    svg {
        color: ${props => props.theme.white};
        line-height: 0;
        cursor: pointer;

        &:hover {
            color: ${props => props.theme.orangeMuralis};
        }

    }
    
    svg:last-child {
        &:hover {
            color: ${props => props.theme.redDanger};
        }
    }

    }

    > p:last-child {
        color: #BABABA;
        font-size: 1rem;
    }

`

export const StyledDialogTitle = styled(Dialog.Title)`
    font-size: 1.25rem;
    font-weight: bold;
    color: ${(props) => props.theme.white};
`;


export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${props => props.theme.white};
`
export const TableStyle = styled.table `
    width: 100%;

    border-collapse: separate;
    border-spacing: 0 0;

    border: solid 1px ${props => props.theme.tableHeadGray};
    border-radius: 6px;

`


export const TBodyTable = styled.tbody `
    > tr {
        background-color: ${props => props.theme.tableColor};
    }

    td {
        font-size: 1rem;
        font-weight: 400;
        padding: 1rem 1.5rem;
        text-align: left;
    }

    tr:last-child {
        td:first-child {
            border-bottom-left-radius: 6px; 
        }
            
        td:last-child {
            border-bottom-right-radius: 6px;
        }
    }

    tr + tr td {
        border-top: solid 1px ${props => props.theme.tableHeadGray};
    }
`
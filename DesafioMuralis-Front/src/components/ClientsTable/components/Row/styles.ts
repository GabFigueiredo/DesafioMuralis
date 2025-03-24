import styled from "styled-components";

export const ValueRow = styled.tr `
    background-color: ${props => props.theme.tableColor};

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

    cursor: pointer;
    &:hover {
        background-color: #EFEFEF;
    }
`

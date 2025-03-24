import styled from "styled-components";

export const TableStyle = styled.table `
    width: 100%;

    border-collapse: separate;
    border-spacing: 0 0;

    border: solid 1px ${props => props.theme.tableHeadGray};
    border-radius: 6px;

`

export const TheadTable = styled.thead `
    > tr {
        background-color: ${props => props.theme.tableHeadGray};
    }

    th {
            font-size: 1rem;
            font-weight: 400;
            padding: 1rem 1.5rem;
            text-align: left;

            &:first-child {
                border-top-left-radius: 6px; 
            }
            
            &:last-child {
                border-top-right-radius: 6px;
            }
    }

`

export const TBodyTable = styled.tbody `
    > tr {
        background-color: ${props => props.theme.tableColor};
    }

    max-height: 1000px;

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
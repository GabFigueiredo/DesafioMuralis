import styled from "styled-components";

export const Asidebar = styled.div `
    max-width: 337px;
    width: 100%;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 4rem 2rem;

    background-color: ${props => props.theme.blueMuralis};

    color: white;

    img {
        padding-bottom: 2rem;
        border-bottom: solid 1px ${props => props.theme.lightBlueMuralis};
    }

    > div:last-child > a {
        font-size: 0.875rem;
        color: ${props => props.theme.tableHeadGray};
    }

`

export const ActionsContainer = styled.div `
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 1rem;

    a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        color: ${props => props.theme.white};
        font-size: 1.25rem;
        font-weight: 500;
        text-decoration: none;

        padding: 0.5rem 1rem;

        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s;

        &:hover {
            background-color: ${props => props.theme.orangeMuralis};
        }

        &.active {
            background-color: ${props => props.theme.orangeMuralis};
        }


    }


`
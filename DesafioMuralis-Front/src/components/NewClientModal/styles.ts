import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);

`

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    background: ${props => props.theme.white};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${props => props.theme.blueMuralis};
        color: ${props => props.theme.white};
        padding: 1.5rem;
    }

    form {
        padding: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        input {
            border-radius: 6px;
            border: 0;
            background: ${props => props.theme.inputGray};
            padding: 1rem;

            &::placeholder {
                color: ${props => props.theme.placeholder};
            }
        }

        button[type=submit] {
            height: 58px;
            border: 0;
            background-color: ${props => props.theme.orangeMuralis};
            color: ${props => props.theme.white};
            font-weight: bold;
            padding: 0 1.25rem;
            border-radius: 6px;

            cursor: pointer;

            &:disabled {
                background: transparent;
                border: solid 1px ${props => props.theme.orangeMuralis};
                color: ${props => props.theme.orangeMuralis};
                cursor: not-allowed;
            }

        }

    }

`

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

import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Select from '@radix-ui/react-select'

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
        padding: 1.5rem;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${props => props.theme.blueMuralis};
        color: ${props => props.theme.white};
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

export const RadioGroupRoot = styled(RadioGroup.Root)`
    display: flex;
    background-color: ${props => props.theme.inputGray};
    border-radius: 6px;

`


export const RadioButton = styled(RadioGroup.Item)`
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

    background-color: ${props => props.theme.inputGray};

    &[data-state="checked"] {
        background-color: ${({ theme }) => theme.tableHeadGray}; 
    }
`

export const RadioGroupController = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;

    border-radius: 6px;

    > input {
        flex: 1;
    }

`
export const PopoverItem = styled(Select.Item)`
    display: flex;
    width: 100%;
    background-color: ${props => props.theme.inputGray};
    border: 0;
    border-radius: 6px;
    padding: 1rem;

    cursor: pointer;

    color: ${props => props.theme.placeholder};
`

export const SelectContent = styled(Select.Trigger)`
    display: flex;
    padding: 1rem;
    background-color: ${props => props.theme.inputGray};

`
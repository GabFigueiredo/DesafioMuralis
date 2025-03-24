import 'styled-components'
import { DefaultTheme } from '../styles/themes/default'

type ThemeType = typeof DefaultTheme

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends ThemeType {}
}
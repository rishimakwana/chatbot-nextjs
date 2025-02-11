import { AppProps } from '@/pages/_app.type'

export type TPage = React.FC<any> & Pick<AppProps['Component'], 'childLayout' | 'rootLayoutProps'>

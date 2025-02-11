import Documents from '@/components/documents/Documents.component'
import { TPage } from '@/types'

const DocumentList: TPage = () => {
  return <Documents />
}

DocumentList.rootLayoutProps = {
  title: 'Document List',
  pageType: 'public',
}

export default DocumentList

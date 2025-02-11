import { useRouter } from 'next/router'
import { Container, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { TAB } from './ThemeGuide.config'
import { TPage } from '@/types'

const ThemeGuide: TPage = () => {
  const router = useRouter()
  const selectedTab = router.query.tab ? String(router.query.tab) : TAB[0].id

  const handleTabChange = (value: string) => {
    router.replace(`/theme-guide?tab=${value}`)
  }

  return (
    <Container>
      <TabContext value={selectedTab}>
        <TabList onChange={(_, value) => handleTabChange(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {TAB.map((item, index) => (
            <Tab key={index} label={item.label} value={item.id} />
          ))}
        </TabList>

        {TAB.map((item, index) => (
          <TabPanel value={item.id} key={index} sx={{ my: 5 }}>
            <item.Content />
          </TabPanel>
        ))}
      </TabContext>
    </Container>
  )
}

ThemeGuide.rootLayoutProps = {
  title: 'Theme Guide',
  pageType: 'public',
}

export default ThemeGuide

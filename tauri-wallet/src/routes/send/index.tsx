import React from 'react'
import { NymCard } from '../../components'
import { SendWizard } from './SendWizard'
import { Layout } from '../../layouts'

export const Send = () => {
  return (
    <Layout>
      <NymCard title="Send tokens" noPadding>
        <SendWizard />
      </NymCard>
    </Layout>
  )
}

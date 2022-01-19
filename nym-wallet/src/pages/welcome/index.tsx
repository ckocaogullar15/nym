import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Stack } from '@mui/material'
import { WelcomeContent, MnemonicWords, VerifyMnemonic } from './pages'
import { NymLogo } from '../../components'
import { TMnemonicObject } from './types'

const mnemonic =
  'futuristic big receptive caption saw hug odd spoon internal dime bike rake helpless left distribution gusty eyes beg enormous word influence trashy pets curl'

const mnemonicToObject = (mnemonic: string): TMnemonicObject => {
  return mnemonic.split(' ').reduce((a, c, index) => {
    return { ...a, [index + 1]: c }
  }, {})
}

export const Welcome = () => {
  const [page, setPage] = useState<'welcome' | 'create account' | 'verify mnemonic'>('welcome')
  const [words, setWords] = useState<{ [key: number]: string }>()

  useEffect(() => {
    const mnemonicObject = mnemonicToObject(mnemonic)
    setWords(mnemonicObject)
  }, [])

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        bgcolor: 'nym.background.dark',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Stack spacing={4} alignItems="center" sx={{ width: 1080 }}>
          <NymLogo />
          {page === 'welcome' && <WelcomeContent onComplete={() => setPage('create account')} />}

          {page === 'create account' && <MnemonicWords words={words} onNext={() => setPage('verify mnemonic')} />}

          {page === 'verify mnemonic' && <VerifyMnemonic words={words} />}
        </Stack>
      </Box>
    </Box>
  )
}

import React from 'react'
import { Alert, Button, Typography } from '@mui/material'
import { WordTiles } from '../components/word-tiles'
import { TMnemonicWords } from '../types'

export const MnemonicWords = ({
  mnemonicWords,
  onNext,
}: {
  mnemonicWords?: TMnemonicWords
  page: 'create account'
  onNext: () => void
}) => {
  return (
    <>
      <Typography sx={{ color: 'common.white', fontWeight: 600 }}>Write down your mnemonic</Typography>
      <Alert icon={false} severity="info" sx={{ bgcolor: '#18263B', color: '#50ABFF', width: 625 }}>
        Please store your mnemonic in a safe place. This is the only way to access your wallet!
      </Alert>
      <WordTiles mnemonicWords={mnemonicWords} showIndex />
      <Button variant="contained" color="primary" disableElevation size="large" onClick={onNext}>
        Verify mnemonic
      </Button>
    </>
  )
}

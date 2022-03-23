import React, { useCallback, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { IdentityKeyFormField } from '@nymproject/react/mixnodes/IdentityKeyFormField';
import { CurrencyFormField } from '@nymproject/react/currency/CurrencyFormField';
import { SimpleModal } from '../Modals/SimpleModal';
import { ModalDivider } from '../Modals/ModalDivider';
import { ModalListItem } from './ModalListItem';
import { validateAmount, validateKey } from '../../utils';

export const DelegateModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  onOk?: (identityKey?: string, amount?: string) => void;
  identityKey?: string;
  onIdentityKeyChanged?: (identityKey: string) => void;
  onAmountChanged?: (amount: string) => void;
  header?: string;
  buttonText?: string;
  rewardInterval: string;
  accountBalance: number;
  minimum: number;
  profitMarginPercentage: number;
  nodeUptimePercentage: number;
  fee: number;
  currency: string;
}> = ({
  open,
  onIdentityKeyChanged,
  onAmountChanged,
  onClose,
  onOk,
  header,
  buttonText,
  identityKey: initialIdentityKey,
  rewardInterval,
  accountBalance,
  fee,
  minimum,
  currency,
  profitMarginPercentage,
  nodeUptimePercentage,
}) => {
  const [identityKey, setIdentityKey] = useState<string | undefined>(initialIdentityKey);
  const [amount, setAmount] = useState<string | undefined>();
  const [isValidated, setValidated] = useState<boolean>(false);

  const validate = useCallback(() => {
    if (!identityKey || !validateKey(identityKey, 32)) {
      setValidated(false);
      return;
    }
    if (!amount || !validateAmount(amount, `${minimum}`)) {
      setValidated(false);
      return;
    }
    setValidated(true);
  }, [amount, identityKey]);

  const handleOk = () => {
    if (onOk) {
      onOk(identityKey, amount);
    }
  };

  const handleIdentityKeyChanged = (newIdentityKey: string) => {
    setIdentityKey(newIdentityKey);
    if (onIdentityKeyChanged) {
      onIdentityKeyChanged(newIdentityKey);
    }
    validate();
  };

  const handleAmountChanged = (newAmount: string) => {
    setAmount(newAmount);
    if (onAmountChanged) {
      onAmountChanged(newAmount);
    }
    validate();
  };

  return (
    <SimpleModal
      open={open}
      onClose={onClose}
      onOk={handleOk}
      header={header || 'Delegate'}
      subHeader="Delegate to mixnode"
      okLabel={buttonText || 'Delegate stake'}
      okDisabled={!isValidated}
    >
      <IdentityKeyFormField
        required
        fullWidth
        placeholder="Node identity key"
        onChanged={handleIdentityKeyChanged}
        initialValue={initialIdentityKey}
        readOnly={Boolean(initialIdentityKey)}
        textFieldProps={{
          autoFocus: !initialIdentityKey,
        }}
      />

      <CurrencyFormField
        required
        fullWidth
        sx={{ mt: 2 }}
        placeholder="Amount"
        autoFocus={Boolean(initialIdentityKey)}
        onChanged={handleAmountChanged}
      />

      <Stack direction="row" justifyContent="space-between" my={3}>
        <Typography fontSize="larger" fontWeight={600}>
          Account balance
        </Typography>
        <Typography fontSize="larger" fontWeight={600}>
          {accountBalance} {currency}
        </Typography>
      </Stack>

      <ModalListItem label="Rewards payout interval" value={rewardInterval} />
      <ModalDivider />
      <ModalListItem label="Node profit margin" value={`${Math.round(profitMarginPercentage * 10000) / 100}%`} />
      <ModalDivider />
      <ModalListItem label="Node uptime" value={`${Math.round(nodeUptimePercentage * 10000) / 100}%`} />
      <ModalDivider />
      <ModalListItem label="Minimum to delegate" value={`${minimum} ${currency}`} />

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Typography color={(theme) => theme.palette.nym.fee}>Fee for this transaction:</Typography>
        <Typography color={(theme) => theme.palette.nym.fee}>
          {fee} {currency}
        </Typography>
      </Stack>
    </SimpleModal>
  );
};

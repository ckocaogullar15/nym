import React, { useCallback, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { IdentityKeyFormField } from '@nymproject/react/mixnodes/IdentityKeyFormField';
import { CurrencyFormField } from '@nymproject/react/currency/CurrencyFormField';
import { SimpleModal } from '../Modals/SimpleModal';
import { ModalDivider } from '../Modals/ModalDivider';
import { ModalListItem } from './ModalListItem';
import { validateAmount, validateKey } from '../../utils';

const MIN_AMOUNT_TO_DELEGATE = 10;

export const DelegateModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  onOk?: (identityKey?: string, amount?: number) => void;
  identityKey?: string;
  onIdentityKeyChanged?: (identityKey: string) => void;
  onAmountChanged?: (amount: number) => void;
  header?: string;
  buttonText?: string;
  rewardInterval: string;
  accountBalance: number;
  estimatedMonthlyReward: number;
  profitMarginPercentage: number;
  nodeUptimePercentage: number;
  fee: number;
  currency: string;
  initialAmount?: number;
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
  estimatedMonthlyReward,
  currency,
  profitMarginPercentage,
  nodeUptimePercentage,
  initialAmount,
}) => {
  const [identityKey, setIdentityKey] = useState<string | undefined>(initialIdentityKey);
  const [amount, setAmount] = useState<number | undefined>(initialAmount);
  const [isValidated, setValidated] = useState<boolean>(false);
  const [errorAmount, setErrorAmount] = useState<string | undefined>();

  const validate = () => {
    let newValidatedValue = true;
    if (!identityKey || !validateKey(identityKey, 32)) {
      newValidatedValue = false;
    }
    if (amount && Number(amount) < MIN_AMOUNT_TO_DELEGATE) {
      setErrorAmount(`Min. delegation amount: ${MIN_AMOUNT_TO_DELEGATE} ${currency}`);
      newValidatedValue = false;
    } else {
      setErrorAmount(undefined);
    }
    setValidated(newValidatedValue);
  };

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
  };

  const handleAmountChanged = (newValue: string, newAmount: number) => {
    setAmount(newAmount);
    if (onAmountChanged) {
      onAmountChanged(newAmount);
    }
  };

  React.useEffect(() => {
    validate();
  }, [amount, identityKey]);

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
        initialValue={initialAmount}
        validationError={errorAmount}
        autoFocus={Boolean(initialIdentityKey)}
        onChanged={handleAmountChanged}
      />

      <Stack direction="row" justifyContent="space-between" my={3}>
        <Typography fontWeight={600}>Account balance</Typography>
        <Typography fontWeight={600}>
          {accountBalance} {currency}
        </Typography>
      </Stack>

      <ModalListItem label="Rewards payout interval" value={rewardInterval} />
      <ModalDivider />
      <ModalListItem label="Node profit margin" value={`${Math.round(profitMarginPercentage * 10000) / 100}%`} />
      <ModalDivider />
      <ModalListItem label="Node uptime" value={`${Math.round(nodeUptimePercentage * 10000) / 100}%`} />
      <ModalDivider />
      <ModalListItem
        label="Est. monthly reward for 10 NYM delegation "
        value={`${estimatedMonthlyReward} ${currency}`}
      />

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Typography fontSize="smaller" color={(theme) => theme.palette.nym.fee}>
          Fee for this transaction:
        </Typography>
        <Typography fontSize="smaller" color={(theme) => theme.palette.nym.fee}>
          {fee} {currency}
        </Typography>
      </Stack>
    </SimpleModal>
  );
};

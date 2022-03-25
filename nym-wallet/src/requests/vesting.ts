import { VestingAccountInfo } from 'src/types/rust/vestingaccountinfo';
import { majorToMinor, minorToMajor } from './coin';
import {
  Coin,
  DelegationResult,
  EnumNodeType,
  Gateway,
  MixNode,
  OriginalVestingResponse,
  Period,
  PledgeData,
} from '../types';
import { invokeWrapper } from './wrapper';

export const getLockedCoins = async (): Promise<Coin> => {
  const coin = await invokeWrapper<Coin>('locked_coins');
  return minorToMajor(coin.amount);
};

export const getSpendableCoins = async (): Promise<Coin> => {
  const coin = await invokeWrapper<Coin>('spendable_coins');
  return minorToMajor(coin.amount);
};

export const getVestingCoins = async (vestingAccountAddress: string): Promise<Coin> => {
  const coin = await invokeWrapper<Coin>('vesting_coins', { vestingAccountAddress });
  return minorToMajor(coin.amount);
};

export const getVestedCoins = async (vestingAccountAddress: string): Promise<Coin> => {
  const coin = await invokeWrapper<Coin>('vested_coins', { vestingAccountAddress });
  return minorToMajor(coin.amount);
};

export const getOriginalVesting = async (vestingAccountAddress: string): Promise<OriginalVestingResponse> => {
  const res = await invokeWrapper<OriginalVestingResponse>('original_vesting', { vestingAccountAddress });
  const major = await minorToMajor(res.amount.amount);
  return { ...res, amount: major };
};

export const withdrawVestedCoins = async (amount: string): Promise<void> => {
  const minor = await majorToMinor(amount);
  await invokeWrapper('withdraw_vested_coins', { amount: { amount: minor.amount, denom: 'Minor' } });
};

export const getCurrentVestingPeriod = async (address: string) =>
  invokeWrapper<Period>('get_current_vesting_period', { address });

export const vestingBond = async ({
  type,
  data,
  pledge,
  ownerSignature,
}: {
  type: EnumNodeType;
  data: MixNode | Gateway;
  pledge: Coin;
  ownerSignature: string;
}) => invokeWrapper<void>(`vesting_bond_${type}`, { [type]: data, ownerSignature, pledge });

export const vestingUnbond = async (type: EnumNodeType) => invokeWrapper<void>(`vesting_unbond_${type}`);

export const vestingDelegateToMixnode = async ({ identity, amount }: { identity: string; amount: Coin }) =>
  invokeWrapper<DelegationResult>('vesting_delegate_to_mixnode', { identity, amount });

export const vestingUnelegateFromMixnode = async (identity: string) =>
  invokeWrapper<DelegationResult>('vesting_undelegate_from_mixnode', { identity });

export const getVestingAccountInfo = async (address: string) =>
  invokeWrapper<VestingAccountInfo>('get_account_info', { address });

export const getVestingPledgeInfo = async ({
  address,
  type,
}: {
  address?: string;
  type: EnumNodeType;
}): Promise<PledgeData | undefined> => {
  try {
    return await invokeWrapper<PledgeData>(`vesting_get_${type}_pledge`, { address });
  } catch (e) {
    return undefined;
  }
};

export const vestingUpdateMixnode = async (profitMarginPercent: number) =>
  invokeWrapper<void>('vesting_update_mixnode', { profitMarginPercent });

export const vestingDelegatedFree = async (vestingAccountAddress: string) =>
  invokeWrapper<Coin>('delegated_free', { vestingAccountAddress });

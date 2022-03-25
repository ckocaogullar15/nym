import { Console } from '../utils/console';
import { Coin, DelegationResult, EnumNodeType, TauriTxResult, TBondArgs } from '../types';
import { invokeWrapper } from './wrapper';

export const bond = async ({ type, data, pledge, ownerSignature }: TBondArgs): Promise<any> => {
  await invokeWrapper<any>(`bond_${type}`, { [type]: data, ownerSignature, pledge });
};

export const unbond = async (type: EnumNodeType) => invokeWrapper<void>(`unbond_${type}`);

export const delegate = async ({ type, identity, amount }: { type: EnumNodeType; identity: string; amount: Coin }) =>
  invokeWrapper<DelegationResult>(`delegate_to_${type}`, { identity, amount });

export const undelegate = async ({
  type,
  identity,
}: {
  type: EnumNodeType;
  identity: string;
}): Promise<DelegationResult | undefined> => {
  try {
    return await invokeWrapper<DelegationResult>(`undelegate_from_${type}`, { identity });
  } catch (e) {
    Console.error(`undelegate_from_${type}`, e as string);
    return undefined;
  }
};

export const send = async (args: { amount: Coin; address: string; memo: string }) =>
  invokeWrapper<TauriTxResult>('send', args);

export const updateMixnode = async (profitMarginPercent: number) =>
  invokeWrapper<void>('update_mixnode', { profitMarginPercent });

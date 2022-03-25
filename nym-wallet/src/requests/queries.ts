import { DelegationEvent } from 'src/types/rust/delegationevent';
import {
  Balance,
  Coin,
  InclusionProbabilityResponse,
  MixnodeStatusResponse,
  Operation,
  StakeSaturationResponse,
  TMixnodeBondDetails,
  TPagedDelegations,
  Epoch,
} from '../types';
import { invokeWrapper } from './wrapper';

export const getReverseMixDelegations = async () =>
  invokeWrapper<TPagedDelegations>('get_reverse_mix_delegations_paged');

export const getReverseGatewayDelegations = async () =>
  invokeWrapper<TPagedDelegations>('get_reverse_gateway_delegations_paged');

export const getPendingDelegations = async () => invokeWrapper<DelegationEvent[]>('get_pending_delegation_events');

export const getPendingVestingDelegations = async () => invokeWrapper<DelegationEvent[]>('get_pending_vesting_delegation_events');

export const getMixnodeBondDetails = async () => invokeWrapper<TMixnodeBondDetails | null>('mixnode_bond_details');

export const getMixnodeStakeSaturation = async (identity: string) =>
  invokeWrapper<StakeSaturationResponse>('mixnode_stake_saturation', { identity });

// export const getMixnodeRewardEstimation = async (identity: string) =>
//   invokeWrapper<RewardEstimationResponse>('mixnode_reward_estimation', { identity });

export const getMixnodeStatus = async (identity: string) =>
  invokeWrapper<MixnodeStatusResponse>('mixnode_status', { identity });

export const checkMixnodeOwnership = async () => invokeWrapper<boolean>('owns_mixnode');

export const checkGatewayOwnership = async () => invokeWrapper<boolean>('owns_gateway');

// NOTE: this uses OUTDATED defaults that might have no resemblance with the reality
// as for the actual transaction, the gas cost is being simulated beforehand
export const getGasFee = async (operation: Operation) =>
  invokeWrapper<Coin>('outdated_get_approximate_fee', { operation });

export const getInclusionProbability = async (identity: string) =>
  invokeWrapper<InclusionProbabilityResponse>('mixnode_inclusion_probability', { identity });

export const userBalance = async () => invokeWrapper<Balance>('get_balance');

export const getCurrentEpoch = async () => invokeWrapper<Epoch>('get_current_epoch');

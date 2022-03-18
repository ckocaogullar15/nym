import { invoke } from '@tauri-apps/api';
import { TDelegation } from '../types';

export const getMixNodeDelegationsForCurrentAccount = async (): Promise<TDelegation[]> =>
  invoke('get_all_mix_delegations');

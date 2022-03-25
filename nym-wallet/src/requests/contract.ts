import { invokeWrapper } from './wrapper';
import { TauriContractStateParams } from '../types';

export const getContractParams = async () => invokeWrapper<TauriContractStateParams>('get_contract_settings');

export const setContractParams = async (params: TauriContractStateParams) =>
  invokeWrapper<TauriContractStateParams>('update_contract_settings', { params });

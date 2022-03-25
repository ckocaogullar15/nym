import { invokeWrapper } from './wrapper';
import { Coin } from '../types';

export const minorToMajor = async (amount: string) => invokeWrapper<Coin>('minor_to_major', { amount });

export const majorToMinor = async (amount: string) => invokeWrapper<Coin>('major_to_minor', { amount });

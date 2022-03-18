export interface DelegateListItem {
  /** Node identity key */
  id: string;
  /** Date of delegation */
  delegationDate: Date;
  /** Delegated amount in decimal currency for network, e.g. 1.05 = 1.05 NYM on mainnet */
  amount: number;
  /** Amount currency */
  amountCurrency: string;
  /** Reward in decimal currency for network, e.g. 1.05 = 1.05 NYM on mainnet */
  reward: number;
  /** A number between 0 and 1 */
  profitMarginPercentage: number;
  /** A number between 0 and 1 */
  uptimePercentage: number;
  /** Is pending */
  isPending?: {
    /** Pending transaction */
    blockHeight: number;
  };
}

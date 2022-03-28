import React, { FC, useState } from 'react';
import { Paper } from '@mui/material';
import { RewardsSummary } from '../../components/Rewards/RewardsSummary';
import { Delegations } from '../../components/Delegation/Delegations';
import { useDelegationContext } from '../../context/delegations';
import { useRewardsContext } from '../../context/rewards';
import { DelegateModal } from '../../components/Delegation/DelegateModal';
import { UndelegateModal } from '../../components/Delegation/UndelegateModal';
import { DelegateListItem } from '../../components/Delegation/types';
import { DelegationListItemActions } from '../../components/Delegation/DelegationActions';
import { RedeemModal } from '../../components/Rewards/RedeemModal';
import { DelegationModal, DelegationModalProps } from '../../components/Delegation/DelegationModal';

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export const DelegationPage: FC = () => {
  const {
    delegations,
    totalDelegations,
    isLoading: isLoadingDelegations,
    addDelegation,
    updateDelegation,
    undelegate,
  } = useDelegationContext();
  const { totalRewards, isLoading: isLoadingRewards } = useRewardsContext();
  const { redeemAllRewards, redeemRewards } = useRewardsContext();
  const [showNewDelegationModal, setShowNewDelegationModal] = useState<boolean>(false);
  const [showDelegateMoreModal, setShowDelegateMoreModal] = useState<boolean>(false);
  const [showUndelegateModal, setShowUndelegateModal] = useState<boolean>(false);
  const [showRedeemRewardsModal, setShowRedeemRewardsModal] = useState<boolean>(false);
  const [showRedeemAllRewardsModal, setShowRedeemAllRewardsModal] = useState<boolean>(false);
  const [confirmationModalProps, setConfirmationModalProps] = useState<DelegationModalProps | undefined>();
  const [currentDelegationListActionItem, setCurrentDelegationListActionItem] = useState<DelegateListItem>();

  // TODO: replace with real value
  const currentAccountId = 'abcdefghijklmnopqrst';

  // TODO: replace with real operation
  const getWalletBalance = async () => '1200 NYM';

  const handleDelegationItemActionClick = (item: DelegateListItem, action: DelegationListItemActions) => {
    setCurrentDelegationListActionItem(item);
    // eslint-disable-next-line default-case
    switch (action) {
      case 'delegate':
        setShowDelegateMoreModal(true);
        break;
      case 'undelegate':
        setShowUndelegateModal(true);
        break;
      case 'redeem':
        setShowRedeemRewardsModal(true);
        break;
    }
  };

  const handleNewDelegation = async (identityKey?: string, amount?: string) => {
    if (!identityKey || !amount) {
      setConfirmationModalProps({
        status: 'error',
        action: 'delegate',
      });
      return;
    }

    setConfirmationModalProps({
      status: 'loading',
      action: 'delegate',
    });
    setShowNewDelegationModal(false);
    setCurrentDelegationListActionItem(undefined);
    try {
      const tx = await addDelegation({
        id: identityKey,
        amount,
        delegationDate: new Date(),
        profitMarginPercentage: 0.1,
        reward: '1 NYM',
        uptimePercentage: 0.99,
        isPending: {
          blockHeight: 1111,
          actionType: 'delegate',
        },
      });
      setConfirmationModalProps({
        status: 'success',
        action: 'delegate',
        balance: await getWalletBalance(),
        transactionUrl: tx.transactionUrl,
      });
    } catch (e) {
      setConfirmationModalProps({
        status: 'error',
        action: 'delegate',
        message: (e as Error).message,
      });
    }
  };

  const handleDelegateMore = async (identityKey?: string, amount?: string) => {
    if (!identityKey || !amount || currentDelegationListActionItem?.id !== identityKey) {
      setConfirmationModalProps({
        status: 'error',
        action: 'delegate',
      });
      return;
    }

    setConfirmationModalProps({
      status: 'loading',
      action: 'delegate',
    });
    setShowDelegateMoreModal(false);
    setCurrentDelegationListActionItem(undefined);
    try {
      const tx = await updateDelegation({
        ...currentDelegationListActionItem,
        amount,
      });
      setConfirmationModalProps({
        status: 'success',
        action: 'delegate',
        balance: await getWalletBalance(),
        transactionUrl: tx.transactionUrl,
      });
    } catch (e) {
      setConfirmationModalProps({
        status: 'error',
        action: 'delegate',
        message: (e as Error).message,
      });
    }
  };

  const handleUndelegate = async (identityKey: string) => {
    setConfirmationModalProps({
      status: 'loading',
      action: 'undelegate',
    });
    setShowUndelegateModal(false);
    setCurrentDelegationListActionItem(undefined);
    try {
      const tx = await undelegate(identityKey);
      setConfirmationModalProps({
        status: 'success',
        action: 'undelegate',
        balance: await getWalletBalance(),
        transactionUrl: tx.transactionUrl,
      });
    } catch (e) {
      setConfirmationModalProps({
        status: 'error',
        action: 'undelegate',
        message: (e as Error).message,
      });
    }
  };

  const handleRedeem = async (identityKey?: string) => {
    if (!identityKey) {
      setConfirmationModalProps({
        status: 'error',
        action: 'redeem',
      });
      return;
    }
    setConfirmationModalProps({
      status: 'loading',
      action: 'redeem',
    });
    setShowRedeemRewardsModal(false);
    setCurrentDelegationListActionItem(undefined);
    try {
      const tx = await redeemRewards(identityKey);
      setConfirmationModalProps({
        status: 'success',
        action: 'redeem',
        balance: await getWalletBalance(),
        recipient: currentAccountId,
        transactionUrl: tx.transactionUrl,
      });
    } catch (e) {
      setConfirmationModalProps({
        status: 'error',
        action: 'redeem',
        message: (e as Error).message,
      });
    }
  };

  const handleRedeemAll = async () => {
    setConfirmationModalProps({
      status: 'loading',
      action: 'redeem-all',
    });
    setShowRedeemAllRewardsModal(false);
    setCurrentDelegationListActionItem(undefined);
    try {
      const tx = await redeemAllRewards();
      setConfirmationModalProps({
        status: 'success',
        action: 'redeem-all',
        balance: await getWalletBalance(),
        recipient: currentAccountId,
        transactionUrl: tx.transactionUrl,
      });
    } catch (e) {
      setConfirmationModalProps({
        status: 'error',
        action: 'redeem-all',
        message: (e as Error).message,
      });
    }
  };

  return (
    <>
      <Paper elevation={0} sx={{ px: 4, py: 2, mb: 4 }}>
        <RewardsSummary
          isLoading={isLoadingDelegations || isLoadingRewards}
          totalDelegation={totalDelegations}
          totalRewards={totalRewards}
          onClickRedeemAll={() => setShowRedeemAllRewardsModal(true)}
        />
      </Paper>

      <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
        <h2>Your Delegations</h2>
        <Delegations
          isLoading={isLoadingDelegations}
          items={delegations}
          explorerUrl={explorerUrl}
          onShowNewDelegation={() => setShowNewDelegationModal(true)}
          onDelegationItemActionClick={handleDelegationItemActionClick}
        />
      </Paper>

      {showNewDelegationModal && (
        <DelegateModal
          open={showNewDelegationModal}
          onClose={() => setShowNewDelegationModal(false)}
          onOk={handleNewDelegation}
          header="Delegate"
          buttonText="Delegate stake"
          currency="NYM"
          fee={0.004375}
          estimatedMonthlyReward={50.123}
          accountBalance={425.2345053}
          nodeUptimePercentage={99.28394}
          profitMarginPercentage={11.12334234}
          rewardInterval="weekly"
        />
      )}

      {currentDelegationListActionItem && showDelegateMoreModal && (
        <DelegateModal
          open={showDelegateMoreModal}
          onClose={() => setShowDelegateMoreModal(false)}
          onOk={handleDelegateMore}
          header="Delegate more"
          buttonText="Delegate more"
          identityKey={currentDelegationListActionItem.id}
          currency="NYM"
          fee={0.004375}
          estimatedMonthlyReward={50.123}
          accountBalance={425.2345053}
          nodeUptimePercentage={99.28394}
          profitMarginPercentage={11.12334234}
          rewardInterval="weekly"
        />
      )}

      {currentDelegationListActionItem && showUndelegateModal && (
        <UndelegateModal
          open={showUndelegateModal}
          onClose={() => setShowUndelegateModal(false)}
          onOk={handleUndelegate}
          currency="NYM"
          fee={0.004375}
          minimum={5}
          amount={150}
          identityKey={currentDelegationListActionItem.id}
        />
      )}

      {currentDelegationListActionItem && showRedeemRewardsModal && (
        <RedeemModal
          open={showRedeemRewardsModal}
          onClose={() => setShowRedeemRewardsModal(false)}
          onOk={handleRedeem}
          message="Redeem rewards"
          currency="NYM"
          identityKey={currentDelegationListActionItem.id}
          fee={0.004375}
          amount={425.65843}
        />
      )}

      {showRedeemAllRewardsModal && (
        <RedeemModal
          open={showRedeemAllRewardsModal}
          onClose={() => setShowRedeemAllRewardsModal(false)}
          onOk={handleRedeemAll}
          message="Redeem all rewards"
          currency="NYM"
          fee={0.004375}
          amount={425.65843}
        />
      )}

      {confirmationModalProps && (
        <DelegationModal
          {...confirmationModalProps}
          open={Boolean(confirmationModalProps)}
          onClose={() => setConfirmationModalProps(undefined)}
        />
      )}
    </>
  );
};

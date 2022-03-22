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

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export const DelegationPage: FC = () => {
  const { delegations, totalDelegations, isLoading: isLoadingDelegations } = useDelegationContext();
  const { totalRewards, isLoading: isLoadingRewards } = useRewardsContext();
  const [showNewDelegationModal, setShowNewDelegationModal] = useState<boolean>(false);
  const [showDelegateMoreModal, setShowDelegateMoreModal] = useState<boolean>(false);
  const [showUndelegateModal, setShowUndelegateModal] = useState<boolean>(false);
  const [showRedeemRewardsModal, setShowRedeemRewardsModal] = useState<boolean>(false);
  const [showRedeemAllRewardsModal, setShowRedeemAllRewardsModal] = useState<boolean>(false);
  const [currentDelegationListActionItem, setCurrentDelegationListActionItem] = useState<DelegateListItem>();
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
          onOk={() => setShowNewDelegationModal(false)}
          header="Delegate"
          buttonText="Delegate stake"
          currency="NYM"
          fee={0.004375}
          minimum={100}
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
          onOk={() => setShowDelegateMoreModal(false)}
          header="Delegate more"
          buttonText="Delegate more"
          identityKey={currentDelegationListActionItem.id}
          currency="NYM"
          fee={0.004375}
          minimum={100}
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
          onOk={() => setShowUndelegateModal(false)}
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
          onOk={() => setShowRedeemRewardsModal(false)}
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
          onOk={() => setShowRedeemAllRewardsModal(false)}
          message="Redeem all rewards"
          currency="NYM"
          fee={0.004375}
          amount={425.65843}
        />
      )}
    </>
  );
};

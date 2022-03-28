use crate::coin::{Coin, Denom};
use crate::error::BackendError;
use crate::nymd_client;
use crate::state::State;
use crate::utils::DelegationEvent;
use crate::utils::DelegationResult;
use cosmwasm_std::{Coin as CosmWasmCoin, Uint128};
use mixnet_contract_common::Delegation;
use mixnet_contract_common::IdentityKey;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;

// #[cfg_attr(test, derive(ts_rs::TS))]
// #[cfg_attr(
//   test,
//   ts(export, export_to = "../src/types/rust/DelegationSummaryResponse.ts")
// )]
#[derive(Deserialize, Serialize)]
pub struct DelegationsSummaryResponse {
  pub delegations: Vec<Delegation>,
  pub total_delegations: Coin,
  pub total_rewards: Coin,
}

#[tauri::command]
pub async fn get_pending_delegation_events(
  state: tauri::State<'_, Arc<RwLock<State>>>,
) -> Result<Vec<DelegationEvent>, BackendError> {
  Ok(
    nymd_client!(state)
      .get_pending_delegation_events(nymd_client!(state).address().to_string(), None)
      .await?
      .into_iter()
      .map(|delegation_event| delegation_event.into())
      .collect::<Vec<DelegationEvent>>(),
  )
}

#[tauri::command]
pub async fn delegate_to_mixnode(
  identity: &str,
  amount: Coin,
  state: tauri::State<'_, Arc<RwLock<State>>>,
) -> Result<DelegationResult, BackendError> {
  let denom = state.read().await.current_network().denom();
  let delegation: CosmWasmCoin = amount.into_cosmwasm_coin(&denom)?;
  nymd_client!(state)
    .delegate_to_mixnode(identity, &delegation)
    .await?;
  Ok(DelegationResult::new(
    nymd_client!(state).address().as_ref(),
    identity,
    Some(delegation.into()),
  ))
}

#[tauri::command]
pub async fn undelegate_from_mixnode(
  identity: &str,
  state: tauri::State<'_, Arc<RwLock<State>>>,
) -> Result<DelegationResult, BackendError> {
  nymd_client!(state)
    .remove_mixnode_delegation(identity)
    .await?;
  Ok(DelegationResult::new(
    nymd_client!(state).address().as_ref(),
    identity,
    None,
  ))
}

#[tauri::command]
pub async fn get_all_mix_delegations(
  state: tauri::State<'_, Arc<RwLock<State>>>,
) -> Result<Vec<Delegation>, BackendError> {
  Ok(
    nymd_client!(state)
      .get_delegator_delegations_paged(nymd_client!(state).address().to_string(), None, None) // get all delegations, ignoring paging
      .await?
      .delegations,
  )
}

#[tauri::command]
pub async fn get_delegator_rewards(
  address: String,
  mix_identity: IdentityKey,
  proxy: Option<String>,
  state: tauri::State<'_, Arc<RwLock<State>>>,
) -> Result<Uint128, BackendError> {
  Ok(
    nymd_client!(state)
      .get_delegator_rewards(address, mix_identity, proxy)
      .await?,
  )
}

#[tauri::command]
pub async fn get_delegation_summary(
  state: tauri::State<'_, Arc<RwLock<State>>>,
) -> Result<DelegationsSummaryResponse, BackendError> {
  let address = nymd_client!(state).address().to_string();

  let delegations = get_all_mix_delegations(state.clone()).await?;
  let mut total_delegations = Coin::new(0u128, &Denom::Minor);
  let mut total_rewards = Coin::new(0u128, &Denom::Minor);

  for d in delegations.clone() {
    total_delegations = total_delegations + d.amount.into();
    let reward = get_delegator_rewards(address.to_string(), d.node_identity, state.clone()).await?;
    total_rewards = total_rewards + Coin::minor(reward);
  }

  Ok(DelegationsSummaryResponse {
    delegations,
    total_delegations,
    total_rewards,
  })
}

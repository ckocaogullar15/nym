// This should be moved out of the wallet, and used as a primary coin type throughout the codebase

use ::config::defaults::DENOM;
use cosmos_sdk::Coin as CosmosCoin;
use cosmos_sdk::Decimal;
use cosmos_sdk::Denom as CosmosDenom;
use cosmwasm_std::Coin as CosmWasmCoin;
use cosmwasm_std::Uint128;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;
use std::fmt;
use std::ops::Add;
use std::str::FromStr;
use ts_rs::TS;
use validator_client::nymd::GasPrice;

use crate::format_err;

#[derive(TS, Serialize, Deserialize, Clone)]
pub enum Denom {
  Major,
  Minor,
}

impl fmt::Display for Denom {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    match *self {
      Denom::Major => f.write_str(&DENOM[1..].to_uppercase()),
      Denom::Minor => f.write_str(DENOM),
    }
  }
}

impl FromStr for Denom {
  type Err = String;

  fn from_str(s: &str) -> Result<Denom, String> {
    let s = s.to_lowercase();
    if s == DENOM.to_lowercase() || s == "minor" {
      Ok(Denom::Minor)
    } else if s == DENOM[1..].to_lowercase() || s == "major" {
      Ok(Denom::Major)
    } else {
      Err(format_err!(format!(
        "{} is not a valid denomination string",
        s
      )))
    }
  }
}

#[derive(TS, Serialize, Deserialize, Clone)]
pub struct Coin {
  amount: String,
  denom: Denom,
}

// TODO convert to TryFrom
impl From<GasPrice> for Coin {
  fn from(g: GasPrice) -> Coin {
    Coin {
      amount: g.amount.to_string(),
      denom: Denom::from_str(&g.denom.to_string()).unwrap(),
    }
  }
}

impl fmt::Display for Coin {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    f.write_str(&format!("{} {}", self.amount, self.denom))
  }
}

// Allows adding minor and major denominations, output will have the LHS denom.
impl Add for Coin {
  type Output = Self;

  fn add(self, rhs: Self) -> Self {
    let denom = self.denom.clone();
    let lhs = self.to_minor();
    let rhs = rhs.to_minor();
    let lhs_amount = lhs.amount.parse::<u64>().unwrap();
    let rhs_amount = rhs.amount.parse::<u64>().unwrap();
    let amount = lhs_amount + rhs_amount;
    let coin = Coin {
      amount: amount.to_string(),
      denom: Denom::Minor,
    };
    match denom {
      Denom::Major => coin.to_major(),
      Denom::Minor => coin,
    }
  }
}

impl Coin {
  pub fn to_major(&self) -> Coin {
    match self.denom {
      Denom::Major => self.clone(),
      Denom::Minor => Coin {
        amount: (self.amount.parse::<f64>().unwrap() / 1_000_000.).to_string(),
        denom: Denom::Major,
      },
    }
  }

  pub fn to_minor(&self) -> Coin {
    match self.denom {
      Denom::Minor => self.clone(),
      Denom::Major => Coin {
        amount: (self.amount.parse::<f64>().unwrap() * 1_000_000.).to_string(),
        denom: Denom::Minor,
      },
    }
  }

  pub fn amount(&self) -> String {
    self.amount.clone()
  }

  pub fn denom(&self) -> Denom {
    self.denom.clone()
  }

  pub fn new(amount: &str, denom: &Denom) -> Coin {
    Coin {
      amount: amount.to_string(),
      denom: denom.clone(),
    }
  }
}

impl TryFrom<Coin> for CosmWasmCoin {
  type Error = String;

  fn try_from(coin: Coin) -> Result<CosmWasmCoin, String> {
    let coin = coin.to_minor();
    Ok(CosmWasmCoin::new(
      Uint128::try_from(coin.amount.as_str()).unwrap().u128(),
      coin.denom.to_string(),
    ))
  }
}

impl TryFrom<Coin> for CosmosCoin {
  type Error = String;

  fn try_from(coin: Coin) -> Result<CosmosCoin, String> {
    let coin = coin.to_minor();
    match Decimal::from_str(&coin.amount) {
      Ok(d) => Ok(CosmosCoin {
        amount: d,
        denom: CosmosDenom::from_str(&coin.denom.to_string()).unwrap(),
      }),
      Err(e) => Err(format_err!(e)),
    }
  }
}

impl From<CosmosCoin> for Coin {
  fn from(c: CosmosCoin) -> Coin {
    Coin {
      amount: c.amount.to_string(),
      denom: Denom::from_str(&c.denom.to_string()).unwrap(),
    }
  }
}

impl From<CosmWasmCoin> for Coin {
  fn from(c: CosmWasmCoin) -> Coin {
    Coin {
      amount: c.amount.to_string(),
      denom: Denom::from_str(&c.denom).unwrap(),
    }
  }
}
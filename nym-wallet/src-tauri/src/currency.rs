use serde::{Deserialize, Serialize};

#[cfg_attr(test, derive(ts_rs::TS))]
#[cfg_attr(
  test,
  ts(export, export, export_to = "../src/types/rust/currencyDenom.ts")
)]
#[cfg_attr(test, ts(rename_all = "UPPERCASE"))]
#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(rename_all = "UPPERCASE")]
pub enum CurrencyDenom {
  Nym,
  Nymt,
  Nyx,
  Nyxt,
}

#[cfg_attr(test, derive(ts_rs::TS))]
#[cfg_attr(
  test,
  ts(
    export,
    export,
    export_to = "../src/types/rust/currencyStringMajorAmount.ts"
  )
)]
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct StringMajorAmount(String);

// see https://github.com/Aleph-Alpha/ts-rs/issues/51 for exporting type aliases

#[cfg_attr(test, derive(ts_rs::TS))]
#[cfg_attr(test, ts(export, export, export_to = "../src/types/rust/currency.ts"))]
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct MajorCurrency {
  pub amount: StringMajorAmount,
  pub denom: CurrencyDenom,
}

// Copyright 2021 Nym Technologies SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use crate::error::{CoconutError, Result};
use crate::utils::hash_g1;
use bls12_381::{G1Affine, G2Affine, G2Prepared, Scalar};
use ff::Field;
use group::Curve;
use rand::thread_rng;
/// System-wide parameters used for the protocol
pub struct Parameters {
    /// Generator of the G1 group
    g1: G1Affine,

    /// Additional generators of the G1 group
    hs: Vec<G1Affine>,

    /// Generator of the G2 group
    g2: G2Affine,

    /// Precomputed G2 generator used for the miller loop
    _g2_prepared_miller: G2Prepared,
}

impl Parameters {
    pub fn new(num_attributes: u32) -> Result<Parameters> {
        if num_attributes == 0 {
            return Err(CoconutError::Setup(
                "Tried to setup the scheme for 0 attributes".to_string(),
            ));
        }

        let hs = (1..=num_attributes)
            .map(|i| hash_g1(format!("h{}", i)).to_affine())
            .collect();

        Ok(Parameters {
            g1: G1Affine::generator(),
            hs,
            g2: G2Affine::generator(),
            _g2_prepared_miller: G2Prepared::from(G2Affine::generator()),
        })
    }

    pub(crate) fn gen1(&self) -> &G1Affine {
        &self.g1
    }

    pub fn gen2(&self) -> &G2Affine {
        &self.g2
    }

    pub fn prepared_miller_g2(&self) -> &G2Prepared {
        &self._g2_prepared_miller
    }

    pub fn gen_hs(&self) -> &[G1Affine] {
        &self.hs
    }

    pub fn random_scalar(&self) -> Scalar {
        // lazily-initialized thread-local random number generator, seeded by the system
        let mut rng = thread_rng();
        Scalar::random(&mut rng)
    }

    pub fn n_random_scalars(&self, n: usize) -> Vec<Scalar> {
        (0..n).map(|_| self.random_scalar()).collect()
    }
}

pub fn setup(num_attributes: u32) -> Result<Parameters> {
    Parameters::new(num_attributes)
}

// for ease of use in tests requiring params
// TODO: not sure if this will have to go away when tests require some specific number of generators
#[cfg(test)]
impl Default for Parameters {
    fn default() -> Self {
        Parameters {
            g1: G1Affine::generator(),
            hs: Vec::new(),
            g2: G2Affine::generator(),
            _g2_prepared_miller: G2Prepared::from(G2Affine::generator()),
        }
    }
}
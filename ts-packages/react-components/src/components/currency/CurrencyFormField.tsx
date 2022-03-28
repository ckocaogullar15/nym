import * as React from 'react';
import { ChangeEvent } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { SxProps } from '@mui/system';
import { CoinMark } from '../coins/CoinMark';

const MAX_VALUE = 1_000_000_000_000_000;
const MIN_VALUE = 0.000001;

export const CurrencyFormField: React.FC<{
  autoFocus?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
  showCoinMark?: boolean;
  initialValue?: number;
  validationError?: string;
  placeholder?: string;
  denom?: 'NYM' | 'NYMT';
  onChanged?: (newValue: string, newAmount: number, denom: string) => void;
  onValidate?: (isValid: boolean, error?: string) => void;
  sx?: SxProps;
}> = ({
  autoFocus,
  required,
  placeholder,
  fullWidth,
  readOnly,
  initialValue,
  validationError: validationErrorProp,
  onChanged,
  onValidate,
  sx,
  showCoinMark = true,
  denom = 'NYM',
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = React.useState<number | undefined>(initialValue);
  const [validationError, setValidationError] = React.useState<string | undefined>(validationErrorProp);

  React.useEffect(() => {
    setValidationError(validationErrorProp);
  }, [validationErrorProp]);

  const fireOnValidate = (result: boolean) => {
    if (onValidate) {
      onValidate(result);
    }
    return result;
  };

  const doValidation = (newValue?: string | number): boolean => {
    // the external validation error is set, so it overrides internal validation messages
    if (validationErrorProp) {
      setValidationError(validationErrorProp);
      return false;
    }

    // handle empty value
    if (!newValue) {
      setValue(undefined);
      setValidationError(undefined);
      return fireOnValidate(false);
    }

    try {
      const newNumber = typeof newValue === 'number' ? newValue : Number.parseFloat(newValue);

      // no negative numbers
      if (newNumber < 0) {
        setValidationError('Amount cannot be negative');
        return fireOnValidate(false);
      }

      // it cannot be larger than the total supply
      if (newNumber > MAX_VALUE) {
        setValidationError('Amount cannot be bigger than the total supply of NYMs');
        return fireOnValidate(false);
      }

      // it can't be lower than one micro coin
      if (newNumber < MIN_VALUE) {
        setValidationError('Amount cannot be less than 1 uNYM');
        return fireOnValidate(false);
      }

      setValidationError(undefined);
      setValue(newNumber);

      return fireOnValidate(true);
    } catch (e) {
      setValidationError((e as Error).message);
      return fireOnValidate(false);
    }
  };

  React.useEffect(() => {
    // validate initial value (only if set), so that validation error UI hints are set without the user typing
    if (initialValue) {
      doValidation(initialValue);
    }
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    doValidation(newValue);

    const newAmount = Number.parseFloat(newValue);
    setValue(newAmount);
    if (onChanged) {
      // TODO: aaaaaaahhhhhh strings for currencies!
      onChanged(`${newValue} ${denom}`, newAmount, denom);
    }
  };

  return (
    <TextField
      type="number"
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      InputProps={{
        readOnly,
        required,
        endAdornment: showCoinMark && (
          <InputAdornment position="end">
            {denom === 'NYM' && <CoinMark height="20px" />}
            {denom !== 'NYM' && <span>NYMT</span>}
          </InputAdornment>
        ),
        ...{
          min: MIN_VALUE,
          max: MAX_VALUE,
        },
      }}
      aria-readonly={readOnly}
      error={validationError !== undefined}
      helperText={validationError}
      defaultValue={initialValue}
      placeholder={placeholder}
      onChange={handleChange}
      sx={sx}
    />
  );
};

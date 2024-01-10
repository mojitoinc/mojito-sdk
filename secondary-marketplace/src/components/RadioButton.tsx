import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

interface RadioButtonProps {
    value?: string;
    optionOne?: string;
    optionTwo?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({ value, optionOne, optionTwo, onChange }: RadioButtonProps) => {
  return (
    <FormControl sx={{ marginBottom: '20px' }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={ value }
        onChange={ onChange }>
        <FormControlLabel value={ optionOne } control={ <Radio /> } label={ optionOne } />
        <FormControlLabel value={ optionTwo } control={ <Radio /> } label={ optionTwo } />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;

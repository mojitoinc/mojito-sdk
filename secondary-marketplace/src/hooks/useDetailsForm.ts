import { ChangeEvent, useState } from 'react';

export interface TokenDetailsForm {
    tokenId: string;
    contractAddress: string;
}

export const useDetailsForm = (initialState: TokenDetailsForm) => {
  const [values, setValues] = useState<TokenDetailsForm>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return [values, handleChange] as const;
};

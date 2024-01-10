import { ChangeEvent, useState } from 'react';

export interface TokenDataForm {
    itemId: string;
    tokenId: string;
    contractAddress: string;
}

export const useTokenForm = (initialState: TokenDataForm) => {
  const [values, setValues] = useState<TokenDataForm>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return [values, handleChange] as const;
};

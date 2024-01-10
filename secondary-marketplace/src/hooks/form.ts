import { ChangeEvent, useState } from "react";
import { OfferDataProps } from "@/interface";

export const useForm = (initialState: OfferDataProps) => {
    const [values, setValues] = useState<OfferDataProps>(initialState);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const resetForm = () => {
      setValues(initialState);
    };
  
    return [values, handleChange, resetForm] as const;
  };
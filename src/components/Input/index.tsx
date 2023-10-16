import { InputHTMLAttributes } from "react";
import { StyledControl, StyledFormHelper, StyledInput } from "./styled";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export default function Input({ error, ...props }: InputProps) {
  return (
    <StyledControl>
      <StyledInput {...props} />
      {error && <StyledFormHelper>{error}</StyledFormHelper>}
    </StyledControl>
  );
}

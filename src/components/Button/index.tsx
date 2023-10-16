import { ReactNode, ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: ReactNode;
  // Add additional props here
  type?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({ label, ...props }: ButtonProps) {
  return <StyledButton {...props}>{label}</StyledButton>;
}

import { StyledButton } from "./styled";

export default function Button({ label, ...props }) {
  return <StyledButton {...props}>{label}</StyledButton>;
}

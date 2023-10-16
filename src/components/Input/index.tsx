import { StyledControl, StyledFormHelper, StyledInput } from "./styled";

export default function Input({ error, ...props }) {
  return (
    <StyledControl>
      <StyledInput {...props} />
      {error && <StyledFormHelper>{error}</StyledFormHelper>}
    </StyledControl>
  );
}

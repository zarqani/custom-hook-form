import styled from "@emotion/styled";

export const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#777" : "#ff9b00")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  border: 0 none;
  display: inline-block;
  line-height: 40px;
  padding: 0 33px;
  font-family: Poppins, Arial, helvetica neue, sans-serif;
  color: #fff;
  transition: all 0.4s ease;
  font-size: 18px;
  border-radius: 0;
`;

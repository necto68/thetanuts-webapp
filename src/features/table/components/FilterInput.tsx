import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";

import { IconContainer } from "../../shared/components";
import { Search } from "../icons";

import { Container, Input } from "./FilterInput.styles";

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const FilterInput: FC<FilterInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <IconContainer height={25} width={25}>
        <Search />
      </IconContainer>
      <Input
        onChange={handleInputChange}
        placeholder={placeholder}
        value={value}
      />
    </Container>
  );
};

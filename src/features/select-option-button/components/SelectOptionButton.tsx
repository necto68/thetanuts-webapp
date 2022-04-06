import { useCallback, useRef, useState } from "react";
import { useOutsideClick } from "rooks";

import { IconContainer, ArrowIcon } from "../../shared/components";
import { getLogoBySymbol } from "../../logo/helpers";

import { BaseOptionsContainer } from "./BaseOptionsContainer";
import {
  SelectButton,
  OptionButton,
  OptionsContainer,
  ButtonContentContainer,
  Container,
} from "./SelectOptionButton.styles";

interface Option {
  id: number | string;
  symbol?: string;
  title?: string;
  color?: string;
}

interface SelectOptionButtonProps<OptionType extends Option> {
  symbol?: string;
  title?: string;
  color?: string;
  options?: OptionType[];
  onOptionClick: (id: OptionType["id"]) => Promise<void> | void;
  isSmall?: boolean;
}

export const SelectOptionButton = <OptionType extends Option>({
  symbol,
  title = "",
  color = "#ffffff",
  options = [],
  onOptionClick,
  isSmall = false,
}: SelectOptionButtonProps<OptionType>) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const chainButtonContainerReference = useRef(null);

  const hasOptions = options.length > 0;

  const handleSelectButtonClick = useCallback(() => {
    if (hasOptions) {
      setIsShowOptions(!isShowOptions);
    }
  }, [hasOptions, isShowOptions]);

  const handleOptionsContainerClose = useCallback(() => {
    setIsShowOptions(false);
  }, []);

  const handleOptionClick = useCallback(
    async (id: Option["id"]) => {
      await onOptionClick(id);
      setIsShowOptions(false);
    },
    [onOptionClick]
  );

  useOutsideClick(chainButtonContainerReference, handleOptionsContainerClose);

  const buttonLogo = getLogoBySymbol(symbol);
  const logoSize = isSmall ? 18 : 25;

  return (
    <Container ref={chainButtonContainerReference}>
      <SelectButton
        isSmall={isSmall}
        onClick={handleSelectButtonClick}
        primaryColor={color}
        secondaryColor="#061f3a"
      >
        <ButtonContentContainer isSmall={isSmall}>
          {symbol ? (
            <IconContainer height={logoSize} width={logoSize}>
              {buttonLogo}
            </IconContainer>
          ) : null}
          {title}
          {hasOptions ? <ArrowIcon up={isShowOptions} /> : null}
        </ButtonContentContainer>
      </SelectButton>
      <BaseOptionsContainer
        isShow={isShowOptions}
        parentReference={chainButtonContainerReference}
      >
        <OptionsContainer>
          {options.map(
            ({
              id,
              symbol: optionSymbol,
              title: optionTitle = "",
              color: optionColor = "#ffffff",
            }) => (
              <OptionButton
                isSmall={isSmall}
                key={id}
                onClick={async () => {
                  await handleOptionClick(id);
                }}
                primaryColor={optionColor}
              >
                <ButtonContentContainer isSmall={isSmall}>
                  {optionSymbol ? (
                    <IconContainer height={logoSize} width={logoSize}>
                      {getLogoBySymbol(optionSymbol)}
                    </IconContainer>
                  ) : null}
                  {optionTitle}
                </ButtonContentContainer>
              </OptionButton>
            )
          )}
        </OptionsContainer>
      </BaseOptionsContainer>
    </Container>
  );
};

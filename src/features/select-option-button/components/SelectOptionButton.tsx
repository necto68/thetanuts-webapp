import { useCallback, useRef, useState } from "react";
import { useOutsideClick } from "rooks";

import { IconContainer, ArrowIcon } from "../../shared/components";
import { getLogoBySymbol } from "../../logo/helpers";

import { BaseOptionsContainer } from "./BaseOptionsContainer";
import {
  OptionButton,
  OptionsContainer,
  ButtonContentContainer,
  Container,
  ButtonTitle,
  ButtonIcon,
  CurrentOptionButton,
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

  const buttonLogoSize = isSmall ? 11 : 18;

  return (
    <Container ref={chainButtonContainerReference}>
      <CurrentOptionButton
        isSmall={isSmall}
        onClick={handleSelectButtonClick}
        primaryColor={color}
        secondaryColor="transparent"
      >
        <ButtonContentContainer isSmall={isSmall}>
          {symbol ? (
            <IconContainer height={buttonLogoSize} width={buttonLogoSize}>
              {buttonLogo}
            </IconContainer>
          ) : null}
          <ButtonTitle>{title}</ButtonTitle>
          {hasOptions ? (
            <ButtonIcon>
              <ArrowIcon up={isShowOptions} />
            </ButtonIcon>
          ) : null}
        </ButtonContentContainer>
      </CurrentOptionButton>
      <BaseOptionsContainer
        isShow={isShowOptions}
        parentReference={chainButtonContainerReference}
      >
        <OptionsContainer>
          {options.map(
            ({ id, symbol: optionSymbol, title: optionTitle = "" }) => (
              <OptionButton
                key={id}
                onClick={async () => {
                  await handleOptionClick(id);
                }}
              >
                <ButtonContentContainer isSmall={isSmall}>
                  {optionSymbol ? (
                    <IconContainer
                      height={buttonLogoSize}
                      width={buttonLogoSize}
                    >
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

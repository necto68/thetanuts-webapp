import type { ComponentType } from "react";
import { createElement, useCallback, useRef, useState } from "react";

import { IconContainer, ArrowIcon } from "../../shared/components";

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
  logo?: ComponentType | null;
  title?: string;
  color?: string;
}

interface SelectOptionButtonProps<OptionType extends Option> {
  logo?: ComponentType | null;
  title?: string;
  color?: string;
  options?: OptionType[];
  onOptionClick: (id: OptionType["id"]) => Promise<void> | void;
  isSmall?: boolean;
}

export const SelectOptionButton = <OptionType extends Option>({
  logo = null,
  title = "",
  color = "#ffffff",
  options = [],
  onOptionClick,
  isSmall = false,
}: SelectOptionButtonProps<OptionType>) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const chainButtonContainerReference = useRef(null);

  const handleOptionClick = useCallback(
    async (id: Option["id"]) => {
      await onOptionClick(id);
      setIsShowOptions(false);
    },
    [onOptionClick]
  );

  const logoSize = isSmall ? 18 : 25;

  return (
    <Container>
      <div ref={chainButtonContainerReference}>
        <SelectButton
          isSmall={isSmall}
          onClick={() => {
            setIsShowOptions(!isShowOptions);
          }}
          primaryColor={color}
          secondaryColor="#061f3a"
        >
          <ButtonContentContainer isSmall={isSmall}>
            {logo ? (
              <IconContainer height={logoSize} width={logoSize}>
                {createElement(logo)}
              </IconContainer>
            ) : null}
            {title}
            <ArrowIcon up={isShowOptions} />
          </ButtonContentContainer>
        </SelectButton>
      </div>
      <BaseOptionsContainer
        isShow={isShowOptions}
        onClose={() => {
          setIsShowOptions(false);
        }}
        parentRef={chainButtonContainerReference}
      >
        <OptionsContainer>
          {options.map(
            ({
              id,
              logo: optionLogo,
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
                  {optionLogo ? (
                    <IconContainer height={logoSize} width={logoSize}>
                      {createElement(optionLogo)}
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

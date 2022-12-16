import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback, useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import makeBlockie from "ethereum-blockies-base64";

import { ArrowIcon, BaseButton } from "../../shared/components";
import { ChainId, web3ModalConfig } from "../constants";
import { addressFormatter } from "../../shared/helpers";
import { BaseOptionsContainer } from "../../select-option-button/components/BaseOptionsContainer";
import { Copy } from "../../shared/icons/Copy";
import { Explorer } from "../../shared/icons/Explorer";
import { getExplorerUrl } from "../helpers";
import { PathType } from "../types";

import {
  ButtonContentContainer,
  CopyAction,
  ExplorerAction,
  Separator,
  WalletAddressAvatar,
  WalletInfo,
  WalletInfoAddress,
  WalletInfoAddressAvatar,
  WalletInfoAddressText,
  WalletInfoContainer,
} from "./WalletButton.styles";

export const WalletButton = () => {
  const [isShow, setIsShow] = useState(false);
  const { account = "", connect, disconnect, network } = useWallet();
  const { chainId = ChainId.ETHEREUM } = network ?? {};

  const walletButtonContainerReference = useRef(null);

  const handleConnect = async () => {
    await connect(web3ModalConfig);
  };

  const handleOpen = useCallback(() => {
    setIsShow(!isShow);
  }, [setIsShow, isShow]);

  const handleClose = useCallback(() => {
    setIsShow(false);
  }, [setIsShow]);

  const copyAddress = () => {
    void navigator.clipboard.writeText(account || "");
  };

  useOutsideClick(walletButtonContainerReference, handleClose);

  const explorerUrl = getExplorerUrl(PathType.address, chainId, account);

  const avatar = account ? makeBlockie(account) : "";

  return account ? (
    <WalletInfo ref={walletButtonContainerReference}>
      <BaseButton onClick={handleOpen}>
        <ButtonContentContainer>
          <WalletAddressAvatar alt="" src={avatar} />
          {addressFormatter(account)}
          <ArrowIcon up={isShow} />
        </ButtonContentContainer>
      </BaseButton>
      <BaseOptionsContainer
        isShow={isShow}
        parentReference={walletButtonContainerReference}
      >
        <WalletInfoContainer>
          <WalletInfoAddress>
            <WalletInfoAddressAvatar alt="" src={avatar} />
            <WalletInfoAddressText>
              {addressFormatter(account)}
            </WalletInfoAddressText>
          </WalletInfoAddress>
          <BaseButton onClick={disconnect}>DISCONNECT</BaseButton>
          <Separator />
          <CopyAction onClick={copyAddress}>
            <Copy />
            Copy Address
          </CopyAction>
          <ExplorerAction href={explorerUrl} target="_blank">
            <Explorer />
            View on Explorer
          </ExplorerAction>
        </WalletInfoContainer>
      </BaseOptionsContainer>
    </WalletInfo>
  ) : (
    <BaseButton onClick={handleConnect}>Connect Wallet</BaseButton>
  );
};

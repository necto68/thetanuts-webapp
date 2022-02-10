import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderWrapper = styled.div`
    width: 470px;
    height: 20px;
`;

export const Header = styled.h5`
    display: inline-block;
    position: relative;
    bottom: 20px;
`;

export const Balance = styled.h5`
    display: inline-block;
    position: relative;
    bottom: 20px;
    float: right;
`;

export const SwapCard = styled.div`
    background-color: #010c1a;
    border-radius: 9px;
    width: 470px;
    height: 80px;
    position: relative;
`;

export const DepositValueEth = styled.h2`
    display: inline-block;
    color: white;
    margin: 25px 40px 0px 15px;
`;

export const DepositValueUsd = styled.h4`
    display: inline-block;
    color: white;
`;

export const MaxButton = styled.button`
    padding: 8px 18px;
    background-color: #010c1a;
    border-radius: 9px;
    border: 1px solid #1b65de;
    color: white;
    font-size: 11px;
    margin-left: 180px;
    display: inline-block;
`;

export const AssetLogo = styled.img`
    width: 25px;
    height: 25px;
    display: inline-block;
    position: absolute;
    left: 370px;
    top: 30px;
`;

export const AssetInitials = styled.h4`
    color: white;
    display: inline-block;
    font-weight: lighter;
    position: absolute;
    left: 400px;
    top: 13px;
`;

export const FlipButton = styled.button`
    background-color: #010c1a;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin: 18px auto 0px auto;
`;

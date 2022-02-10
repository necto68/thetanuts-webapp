import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  height: 60px;
`;

export const Title = styled.h3`
  position: relative;
`;

export const ExitButton = styled.button`
  overflow: hidden;
  position: relative;
  border: none;
  padding: 0;
  left: 430px;
  bottom: 50px;
  width: 2em; height: 2em;
  border-radius: 50%;
  border-color: black;
  background: transparent;
  color: black;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;

  &:focus {
    outline: solid 0 transparent;
    box-shadow: 0 0 0 2px #8ed0f9
  }

  &:hover {
    background: rgba(29, 161, 142, .1)
  }

  &:before, &:after {
    position: absolute;
    top: 15%; left: calc(50% - .0625em);
    width: .125em; height: 70%;
    border-radius: .125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: ''
  }

  &:after { transform: rotate(-45deg); }
  
`;
import styled from "styled-components";
import { motion } from "framer-motion";

export const ExpandButton = styled(motion.button)`
    font-family: Barlow;
    font-size: 15px;
    text-align: left;
    background: transparent;
    border-radius: 15px;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    padding: 10px 24px;
    margin-top: 10px;
    cursor: pointer;
`;
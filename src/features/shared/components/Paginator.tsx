import type { PaginationProps } from "rc-pagination";
import Pagination from "rc-pagination";

import { ArrowBack, ArrowFront } from "../icons";

import { PaginationContainer } from "./Paginator.styles";

export const Paginator = (props: PaginationProps) => {
  const { total = 0, pageSize = 10 } = props;

  return total > pageSize ? (
    <PaginationContainer>
      <Pagination {...props} nextIcon={ArrowFront} prevIcon={ArrowBack} />
    </PaginationContainer>
  ) : null;
};

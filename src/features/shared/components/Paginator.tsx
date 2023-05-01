import type { PaginationProps, PaginationLocale } from "rc-pagination";
import Pagination from "rc-pagination";

import { ArrowBack, ArrowFront } from "../icons";

import { PaginationContainer } from "./Paginator.styles";

export const Paginator = (props: PaginationProps) => {
  const { total = 0, pageSize = 10 } = props;

  /* eslint-disable @typescript-eslint/naming-convention, camelcase */
  const locale: PaginationLocale = {
    next_page: "Next Page",
    prev_page: "Previous Page",
  };
  /* eslint-enable @typescript-eslint/naming-convention, camelcase */

  return total > pageSize ? (
    <PaginationContainer>
      {/* @ts-expect-error Server Component */}
      <Pagination
        {...props}
        locale={locale}
        nextIcon={ArrowFront}
        prevIcon={ArrowBack}
      />
    </PaginationContainer>
  ) : null;
};

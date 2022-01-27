import { useCallback, useEffect, useState } from 'react';
import { sort } from 'fast-sort';

interface SortState<T> {
  key: keyof T | '';
  order?: 'ASC' | 'DESC';
}

export const useSortBy = <T>(
  defaultArray: T[],
  getKey: (element: T) => string,
) => {
  const [sortedArray, setSortedArray] = useState(defaultArray);
  const [sortState, setSortState] = useState<SortState<T>>({ key: '' });
  const effectKey = defaultArray.map(getKey).join();

  useEffect(() => {
    setSortedArray(defaultArray);
    setSortState({ key: '' });
  }, [effectKey]);

  const updateSort = useCallback(
    (key: keyof T, by?: (element: T) => any) => {
      let nextSortedArray = defaultArray;
      let nextSortState = sortState;

      if (key === sortState.key) {
        if (sortState.order === 'ASC') {
          nextSortedArray = sort(defaultArray).by({
            desc: by ?? key,
          });
          nextSortState = {
            key,
            order: 'DESC',
          };
        }

        if (sortState.order === 'DESC') {
          nextSortedArray = defaultArray;
          nextSortState = {
            key: '',
          };
        }
      } else {
        nextSortedArray = sort(defaultArray).by({
          asc: by ?? key,
        });
        nextSortState = {
          key,
          order: 'ASC',
        };
      }

      setSortedArray(nextSortedArray);
      setSortState(nextSortState);
    },
    [defaultArray, sortState],
  );

  return [sortedArray, sortState, updateSort] as const;
};

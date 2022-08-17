import styled from "styled-components";

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  --primary-color: #1fffab;

  .rc-pagination {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-family: Barlow;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    gap: 2px;

    ul,
    ol {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      cursor: pointer;
      padding: 4px;
    }

    .rc-pagination-item-active {
      color: var(--primary-color);
      font-weight: 700;
    }

    .rc-pagination-prev,
    .rc-pagination-next {
      cursor: pointer;
      transform: translateY(1px);
      &:hover {
        * {
          fill: var(--primary-color);
        }
      }
    }

    &-jump-prev,
    &-jump-next {
      outline: 0;

      button {
        background: transparent;
        border: none;
        cursor: pointer;
        color: #666;

        &:hover {
          &:after {
            color: var(--primary-color);
          }
        }
      }

      button:after {
        display: block;
        content: "•••";
        transform: translateY(-2px);
      }
    }
  }
`;

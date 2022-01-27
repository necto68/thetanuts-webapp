export const PRICE_FEED = [
  {
    inputs: [
      {
        internalType: 'contract AggregatorV3Interface',
        name: 'priceFeed',
        type: 'address',
      },
    ],
    name: 'getLatestPriceX1e6',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

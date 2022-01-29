export const ilVaultABI = [
  {
    inputs: [
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "period", type: "uint256" },
      { internalType: "uint256", name: "collatCap", type: "uint256" },
      { internalType: "contract IERC20", name: "baseAddress", type: "address" },
      { internalType: "uint8", name: "baseDecimals", type: "uint8" },
      {
        internalType: "contract IERC20",
        name: "quoteAddress",
        type: "address",
      },
      { internalType: "uint8", name: "quoteDecimals", type: "uint8" },
      {
        internalType: "contract HistoricalPriceConsumerV3_1",
        name: "priceFeed",
        type: "address",
      },
      {
        internalType: "contract AggregatorV3Interface",
        name: "linkAggregator",
        type: "address",
      },
      { internalType: "bytes", name: "baseSymbol", type: "bytes" },
      { internalType: "bytes", name: "quoteSymbol", type: "bytes" },
    ],

    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,

    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],

    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,

    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amt",
        type: "uint256",
      },
    ],

    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,

    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_strikeX1e6",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_premium",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_minSizeOfVault",
        type: "uint256",
      },
    ],

    name: "NewEpoch",
    type: "event",
  },
  {
    anonymous: false,

    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amt",
        type: "uint256",
      },
    ],

    name: "QueueWithdraw",
    type: "event",
  },
  {
    anonymous: false,

    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_strikeX1e6",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_oracleTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_settlementLoss",
        type: "uint256",
      },
    ],

    name: "Settlement",
    type: "event",
  },
  {
    anonymous: false,

    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],

    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,

    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amt",
        type: "uint256",
      },
    ],

    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "BASE",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASE_DECIMALS",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "COLLAT",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "COLLAT_CAP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "COLLAT_CAP_QUOTE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DESIGNATED_MAKER",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_AGGREGATOR",

    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],

    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PRICE_FEED",

    outputs: [
      {
        internalType: "contract HistoricalPriceConsumerV3_1",
        name: "",
        type: "address",
      },
    ],

    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUOTE",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUOTE_DECIMALS",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "START_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VALIDATOR",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "aaveV2LendingPool",

    outputs: [
      { internalType: "contract ILendingPool", name: "", type: "address" },
    ],

    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],

    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],

    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collatWithdrawn",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentEpochAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentEpochPremium",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],

    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amt", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "depositIntoLendingPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amt", type: "uint256" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
    ],

    name: "depositOnBehalf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "token", type: "address" },
    ],

    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "epoch",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_epoch", type: "uint256" }],
    name: "epochExpiry",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiry",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],

    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "roundStrikeX1e6", type: "uint256[]" },
      { internalType: "uint256", name: "premium", type: "uint256" },
      { internalType: "uint256", name: "collatAmt", type: "uint256" },
    ],

    name: "initNewRound",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "roundStrikeX1e6", type: "uint256[]" },
      { internalType: "uint256", name: "premium", type: "uint256" },
      { internalType: "uint256", name: "collatAmt", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],

    name: "initNewRoundSigned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amt", type: "uint256" }],
    name: "initWithdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "optionType",

    outputs: [
      {
        internalType: "enum SynMiningVaultV1.OptionMode",
        name: "",
        type: "uint8",
      },
    ],

    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "queuedExitEpoch",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "queuedExitLP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "_ap",
        type: "address",
      },
    ],

    name: "setAaveAddressProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_flag", type: "bool" }],
    name: "setAllowInteraction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "arbitraryExpiry", type: "uint256" },
    ],

    name: "setExpiry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newMaker", type: "address" }],
    name: "setMaker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newDepositCap", type: "uint256" },
    ],

    name: "setMaxCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract HistoricalPriceConsumerV3_1",
        name: "newPriceFeed",
        type: "address",
      },
    ],

    name: "setPriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newValidator", type: "address" },
    ],

    name: "setValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract VaultHook",
        name: "_newVaultHook",
        type: "address",
      },
    ],

    name: "setVaultHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "priceX1e6", type: "uint256" }],
    name: "settleStrike_MM",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleStrike_chainlink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleStrike_chainlink_fallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "strikeX1e6",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "syncBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalLPExit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPendingExit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],

    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],

    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "valuePerLPX1e18",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vaultHook",

    outputs: [
      { internalType: "contract VaultHook", name: "", type: "address" },
    ],

    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "withdrawFromLendingPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

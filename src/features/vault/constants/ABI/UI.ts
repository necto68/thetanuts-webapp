export const UI = [
  {
    inputs: [
      {
        internalType: 'contract OptionsContractV0',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'getVaultInfo',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'max_deposit', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'total_deposit_current',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'total_deposit', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'total_exit_current',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'total_exit', type: 'uint256' },
          { internalType: 'uint256', name: 'total_asset', type: 'uint256' },
          { internalType: 'uint256', name: 'premium', type: 'uint256' },
          { internalType: 'uint256', name: 'strike_price', type: 'uint256' },
          { internalType: 'uint256', name: 'time_on_expiry', type: 'uint256' },
          { internalType: 'uint256', name: 'epoch', type: 'uint256' },
          { internalType: 'uint256', name: 'assetScaleX1e36', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'period', type: 'uint256' },
          { internalType: 'string', name: 'notes', type: 'string' },
        ],
        internalType: 'struct Reader.Vault',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract OptionsContractV0',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'myVaultPosition',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

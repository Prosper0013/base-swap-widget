import { AlphaRouter, SwapType } from '@uniswap/smart-order-router'
import { Token, TradeType, CurrencyAmount } from '@uniswap/sdk-core'
import { ethers } from 'ethers'
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk'
import { YOUR_TOKEN_ADDRESS, RPC_URL } from './config'

// Initialize router
const router = new AlphaRouter({
  chainId: 8453, // Base Chain
  provider: new ethers.providers.JsonRpcProvider(RPC_URL)
})

// Token definitions
export const ETH = new Token(
  8453,
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  18,
  'ETH',
  'Ether'
)

export const BDOGE = new Token(
  8453,
  YOUR_TOKEN_ADDRESS,
  18, // Confirm decimals
  'BDOGE',
  'Based Doge'
)

export const getSwapQuote = async (amount, fromToken, toToken) => {
  const amountIn = CurrencyAmount.fromRawAmount(
    fromToken,
    ethers.utils.parseUnits(amount, fromToken.decimals).toString()
  )

  return router.route(
    amountIn,
    toToken,
    TradeType.EXACT_INPUT,
    {
      type: SwapType.UNIVERSAL_ROUTER,
      recipient: '0x0000000000000000000000000000000000000000', // Replace with user address
      slippageTolerance: 0.5, // 0.5%
      deadlineOrPreviousBlockhash: Math.floor(Date.now() / 1000 + 1800) // 30 mins
    }
  )
}
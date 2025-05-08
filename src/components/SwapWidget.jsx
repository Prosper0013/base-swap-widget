"use client"
import { useState, useEffect } from 'react'
import { useAccount, useBalance, useNetwork, useSigner } from 'wagmi'
import { ETH, BDOGE, getSwapQuote } from '@/lib/swapUtils'
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk'
import toast from 'react-hot-toast'
import { parseUnits } from 'viem'

export default function SwapWidget() {
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const [fromAmount, setFromAmount] = useState('')
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch balances
  const { data: ethBalance } = useBalance({ address })
  const { data: bdogeBalance } = useBalance({
    address,
    token: BDOGE.address,
    enabled: isConnected
  })

  // Get fresh quote on amount change
  useEffect(() => {
    if (!fromAmount || !isConnected) return
    
    const fetchQuote = async () => {
      try {
        const quote = await getSwapQuote(fromAmount, ETH, BDOGE)
        setQuote(quote)
      } catch (error) {
        toast.error('Failed to get price quote')
      }
    }
    
    fetchQuote()
  }, [fromAmount, isConnected])

  const executeSwap = async () => {
    if (!quote || !signer || !address) return
    setLoading(true)
    
    try {
      const tx = await signer.sendTransaction({
        to: UNIVERSAL_ROUTER_ADDRESS(8453),
        data: quote.methodParameters.calldata,
        value: quote.methodParameters.value,
        gasLimit: quote.estimatedGasUsed.mul(120).div(100) // 20% buffer
      })

      toast.promise(
        tx.wait(),
        {
          loading: 'Processing swap...',
          success: 'Swap completed!',
          error: 'Swap failed'
        }
      )
    } catch (error) {
      toast.error(error.shortMessage || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-xl p-6">
      {/* Token Inputs (same as before) */}
      
      {/* Price Info */}
      {quote && (
        <div className="my-4 text-sm text-gray-400">
          <div>Price: 1 ETH = {quote.quote.toFixed(6)} BDOGE</div>
          <div>Estimated gas: {ethers.utils.formatUnits(quote.estimatedGasUsed, 'gwei')} Gwei</div>
        </div>
      )}

      <button
        onClick={executeSwap}
        disabled={!isConnected || !quote || loading}
        className="w-full py-3 bg-blue-600 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Swapping...' : 'Swap'}
      </button>
    </div>
  )
}
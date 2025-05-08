import { WalletProvider } from "@/providers/WalletProvider";
import SwapWidget from "@/components/SwapWidget";

export default function Home() {
  return (
    <WalletProvider>
      <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <SwapWidget />
      </main>
    </WalletProvider>
  );
}
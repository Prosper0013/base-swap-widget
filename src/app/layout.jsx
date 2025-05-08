export const metadata = {
  title: 'BDOGE Swap',
  description: 'Swap ETH ↔ BDOGE on Base Chain',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950">{children}</body>
    </html>
  );
}

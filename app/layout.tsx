import "./globals.css";

export const metadata = {
  title: "TrueProof",
  description: "Authorship provenance receipt prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

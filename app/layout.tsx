import NavBar from "@/components/NavBar";

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

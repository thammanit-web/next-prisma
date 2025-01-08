import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav
          className="flex items-center justify-center text-white py-3"
          style={{
            backgroundImage: "url('https://png.pngtree.com/background/20230412/original/pngtree-nature-forest-sun-ecology-picture-image_2394782.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ><a href="/home" className="hover:underline">Home</a>
        </nav>
        {children}
        <footer className="mt-auto text-center text-zinc-400 ">
      <small>All rights reserved.</small>
    </footer>
      </body>
    </html>
  );
}

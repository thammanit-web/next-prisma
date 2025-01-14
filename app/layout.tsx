import "./globals.css";
import Nav from './components/Nav';
import Footer from './components/Footer';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html>
        <body className="flex flex-col h-screen w-full">
         <Nav/>
         <main className="flex-1">
          {children}
          </main>
        <Footer />
        </body>
      </html>
 );
}

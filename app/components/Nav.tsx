'use client';
import { useRouter,usePathname  } from 'next/navigation';
import Link from 'next/link';


export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith('/login')){
    return null
  };

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });

    if (response.ok) {
      router.push('/login');
    } else {
      console.error('Failed to logout');
    }
  };

  return (
    <nav
      className="flex items-center justify-between text-white py-3 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/background/20230412/original/pngtree-nature-forest-sun-ecology-picture-image_2394782.jpg')",
      }}
    >
      <Link
        href="/"
        className="hover:underline px-10 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl hover:text-gray-400"
      >
        Home
      </Link>
      <button
        onClick={handleLogout}
        className="mr-8 bg-transparent hover:text-gray-400 py-2 px-4 border border-white hover:border-gray-400 rounded text-base sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
      >
        Logout
      </button>
    </nav>
  );
}

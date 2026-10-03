import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ];
  return (
    <header className="bg-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-white border-b border-gray-700">
        <div className="text-xl font-bold">SAB Healthcare</div>
        <nav className="flex space-x-4">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
            className="text-black"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

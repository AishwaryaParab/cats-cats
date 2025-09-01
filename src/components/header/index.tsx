import Link from "next/link";
import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header>
      <Container className="flex flex-col sm:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-4xl font-bold py-6 text-center text-primary cursor-pointer"
        >
          Cats Cats!{" "}
          <span className="text-sm font-light italic">everywhere</span>
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href="/favourites"
            className="flex gap-2 items-center hover:underline"
          >
            <Heart className="w-5 h-5" />
            <p>Favourites</p>
          </Link>

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;

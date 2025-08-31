import Link from "next/link";
import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header>
      <Container className="flex justify-between items-center">
        <h1 className="text-4xl font-bold py-6 text-center text-primary">
          Cats Cats!{" "}
          <span className="text-sm font-light italic">everywhere</span>
        </h1>

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

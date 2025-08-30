import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";

const Header = () => {
  return (
    <header>
      <Container className="flex justify-between items-center">
        <h1 className="text-4xl font-bold py-6 text-center text-primary">
          Cats Cats!{" "}
          <span className="text-sm font-light italic">everywhere</span>
        </h1>

        <ThemeToggle />
      </Container>
    </header>
  );
};

export default Header;

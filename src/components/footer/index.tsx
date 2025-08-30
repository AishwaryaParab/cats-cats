import { socials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-center" aria-label="Site Footer">
      <Container className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p>
          Made with 💜 by{" "}
          <span className="font-semibold text-primary">Aishwarya Parab</span>
        </p>

        <nav aria-label="social-links" className="flex items-center gap-4">
          {socials?.map((social) => (
            <Link
              key={social.name}
              href={social.link}
              aria-label={`Visit ${social.name} profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.imageUrl}
                alt={`${social.name} icon`}
                width={30}
                height={30}
              />
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;

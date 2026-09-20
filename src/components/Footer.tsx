import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/yatinannam", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/yatinannam/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ninjayatin@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4 md:px-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="label-mono">
          © {new Date().getFullYear()} Yatin Annam
        </p>
        <div className="flex items-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

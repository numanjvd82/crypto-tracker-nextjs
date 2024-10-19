import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { AnchorHTMLAttributes, ReactNode } from "react";

interface NextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

const NextLink: React.FC<NextLinkProps> = ({
  href,
  children,
  className = "font-medium text-blue-600 dark:text-blue-500 hover:underline my-2",
  activeClassName = "",
  target,
  ...rest
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={`${className} ${isActive ? activeClassName : ""}`.trim()}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rest.rel}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};

export default NextLink;

import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width = 40, height = 20, className = "" }: LogoProps) => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};

export default Logo;

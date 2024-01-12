import React from "react";

const Button = ({ children, variant }: { children: React.ReactNode;variant:string}) => {
  return (
    <button className={`${variant === 'outline' && "border-black border px-8" }`}>
      {children}
    </button>
  );
};

export default Button;

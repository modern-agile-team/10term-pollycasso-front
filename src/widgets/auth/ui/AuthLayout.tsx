import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-[690px] min-h-[700px] rounded-lg bg-white/30">
        {children}
      </div>
    </div>
  );
};

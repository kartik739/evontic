import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return <div className="flex justify-center pt-10">{children}</div>;
};

export default AuthLayout;

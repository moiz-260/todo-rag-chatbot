"use client";

import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full font-sans overflow-x-hidden">
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/background.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <main className="relative z-10 flex min-h-screen items-center justify-center pt-6 pb-8 px-4">
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;

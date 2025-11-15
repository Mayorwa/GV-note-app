import React, {ReactNode} from "react";

interface ILayoutProps {
    children: ReactNode;
    pageName: string;
}

import Logo from "@/assets/img/logo.svg";

const DefaultLayout: React.FC<ILayoutProps> = ({children, pageName}) => {
    return (
        <>
            <main className="bg-white">
                <div className="container flex py-5 h-full">
                    <div className="w-full flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img src={Logo} alt="Product Logo" className="mx-auto h-11 w-auto" />
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 uppercase">{pageName}</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default DefaultLayout;
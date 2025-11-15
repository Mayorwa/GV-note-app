import React from "react";
import logo from "@/assets/img/logo.svg";
// import MenuNav from "@/components/common/MenuNav.tsx";
import ProfileNav from "@/components/common/ProfileNav.tsx";

const BoardHeader: React.FC = () => {
    return (
        <>
            <div className="h-16 bg-white flex items-center justify-between border border-solid border-gray-20">
                <div className="container">
                    <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center mr-9">
                            <a href="#">
                                <img alt="Logo" src={logo} className="h-9 block"/>
                            </a>
                        </div>
                        <div className="flex items-center sm:justify-between justify-end">
                            {/*<div className="sm:flex items-center mx-auto hidden">
                                <MenuNav/>
                            </div>*/}
                            <ProfileNav/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="sm:hidden flex items-center justify-center mx-auto bg-white border-gray-20 border-t border-dashed">
                <MenuNav/>
            </div>*/}
        </>
    )
}

export default BoardHeader;
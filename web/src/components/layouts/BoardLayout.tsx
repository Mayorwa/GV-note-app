import React from 'react'
import BoardHeader from "@/components/common/BoardHeader.tsx";
import {LayoutProps} from "@/types";

const BoardLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <main className="board p-2">
                <BoardHeader/>
                <main className="container py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </main>
        </>
    )
}

export default BoardLayout;
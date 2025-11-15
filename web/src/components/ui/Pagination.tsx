import React from "react";
import Button from "@/components/ui/Button/Button.tsx";
import Icon from "@/components/ui/Icon.tsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onSwitchPage: (action: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onSwitchPage, }) => {

    return (
        <div className="flex justify-between border-t py-4">
            <p>Page {currentPage} of {totalPages}</p>

            <div className="flex">
                <Button
                    variant="text"
                    onClick={() => onSwitchPage("decr")}
                    disabled={currentPage <= 1}
                    btnClass="py-2 px-3"
                >
                    <Icon name="arrow-left" width="18px" height="18px" />
                    <span className="ml-2">Previous</span>
                </Button>

                <span className="border-r border-black mx-2" />

                <Button
                    variant="text"
                    onClick={() => onSwitchPage("incr")}
                    disabled={currentPage >= totalPages}
                    btnClass="py-2 px-3"
                >
                    <span className="mr-2">Next</span>
                    <Icon name="arrow-right" width="18px" height="18px" />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
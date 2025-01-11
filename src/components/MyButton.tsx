// MyButton.tsx
import React from "react";

const MyButton = ({
    icon: Icon,
    className,
    onClick,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    className: string;
    onClick?: () => void;
}) => {
    return (
        <button
            className={`${className} flex items-center gap-2`}
            onClick={onClick}
        >
            <Icon className="w-6 h-6" />
        </button>
    );
};

export default MyButton;

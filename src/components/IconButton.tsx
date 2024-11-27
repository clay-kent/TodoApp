import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { twMerge } from 'tailwind-merge';

interface Props {
    onClick: () => void;
    icon: IconProp;
    color?: 'bg-blue-500' | 'bg-red-500';
}

const IconButton: React.FC<Props> = ({ onClick, icon, color = 'bg-blue-500' }) => (
    <button onClick={onClick} className={twMerge(`mr-2 rounded-md px-4 py-2 text-white`, color)}>
        <FontAwesomeIcon icon={icon} />
    </button>
);

export default IconButton;
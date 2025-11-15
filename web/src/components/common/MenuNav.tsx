import React from 'react';
import { NavLink } from 'react-router-dom';
// components
import Icon from '@/components/ui/Icon.tsx';

const navItems = [
    { name: 'Notes', routeLink: '/board', icon: 'notes' },
];

const MenuNav: React.FC = () => {

    return (
        <div className="flex flex-row sm:my-5 my-2 lg:my-0 items-center px-2 lg:px-0">
            {navItems.map((item, index) => (
                <NavLink key={index} to={item.routeLink} end className={({ isActive }) =>
                        `px-4 py-2 rounded-md hover:bg-gray-100 text-sm mr-2 ${
                            isActive ? 'bg-gray-200' : ''
                        }`
                    }
                >
                  <span className="flex items-center">
                    <Icon name={item.icon} className="w-4 h-4" />
                    <span className="mx-2">{item.name}</span>
                    <span className="lg:hidden"></span>
                  </span>
                </NavLink>
            ))}
        </div>
    );
};

export default MenuNav;
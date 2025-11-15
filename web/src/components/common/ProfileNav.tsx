import React, { useState } from 'react';

// COMPONENTS
import Icon from '@/components/ui/Icon.tsx';

// ASSETS
import avatar from '@/assets/img/avatar.png';

import {StorageHelper} from "@/helpers/storageHelper.ts";

const ProfileNav: React.FC = () => {
    const user = StorageHelper.getUserData();
    const [isShowProfile, setIsShowProfile] = useState(false);

    const logout = () => {
        StorageHelper.logout();
    }
    const hideTopNavBarPopUp = () => {
        setTimeout(() => {
            setIsShowProfile(false);
        }, 200);
    };

    const showProfile = () => {
        setIsShowProfile(!isShowProfile);
    };

    const closeDropdown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setIsShowProfile(false);
        }
    };

    return (
        <div className="relative" onKeyUp={closeDropdown}>
            <div
                className="flex items-center h-full cursor-pointer"
                onBlur={hideTopNavBarPopUp}
                onClick={showProfile}
            >
                <div className="w-8">
                    <img src={avatar} alt="Avatar" />
                </div>
                <div className="mx-2 capitalize">{user?.name}</div>
                <div>
                    <Icon name="caret-down" width="16px" height="16px" />
                </div>
            </div>
            {isShowProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md z-10">
                    <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100">
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                            <Icon name="logout" width="16px" height="16px" />
                            <a href="#" className="ml-2 text-black">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileNav;

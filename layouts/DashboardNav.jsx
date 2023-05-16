import Link from 'next/link';
import Private from './Private';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const DashboardNav = ({ children }) => {
    const Router = useRouter();
    const Links = [
        {
            id: 0,
            pathname: 'Profile',
            link: '/dashboard/profile',
            icon: faUser,
        },
        {
            id: 1,
            pathname: 'Bikes',
            link: '/dashboard/bikes',
            icon: faMotorcycle,
        },
        {
            id: 2,
            pathname: 'Orders',
            link: '/dashboard/orders',
            icon: faBox,
        },
        {
            id: 3,
            pathname: 'Sells',
            link: '/dashboard/sells',
            icon: faDollar,
        },
        {
            id: 4,
            pathname: 'Users',
            link: '/dashboard/users',
            icon: faListCheck,
        },
    ];
    return (
        <Private>
            <div className='dashboardnav__container'>
                <div className='dashboardnav__container_nav'>
                    <h3>Dashboard</h3>
                    <ul>
                        {Links.map((item) => {
                            const { id, pathname, link, icon } = item;
                            return (
                                <li
                                    key={id}
                                    className={`${
                                        Router.pathname.includes(link)
                                            ? 'dashboardnav__container_nav__li__active'
                                            : 'dashboardnav__container_nav__li'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={icon} className="dashboardnav__container_nav__li_icons"/>
                                    <Link href={link}>{pathname}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>{children}</div>
            </div>
        </Private>
    );
};

export default DashboardNav;

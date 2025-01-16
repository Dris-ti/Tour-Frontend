'use client'
import { faArrowRightFromBracket, faChartLine, faPlane, faSquarePollVertical, faUser, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';


export default function SideBar(props: any) {
    return (
        <div>
            <ul className="menu bg-primarycolor text-white w-56 h-screen text-center">
                <div>
                    <FontAwesomeIcon icon={faPlane} width={100} color='white' />
                    <p className='text-lg'>Tour Finder</p>
                </div>
                <div className='h-12'></div>
                <li>
                    <Link href='/Dashboard'>
                        <FontAwesomeIcon icon={faSquarePollVertical} />
                        Overview
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/Admins">
                        <FontAwesomeIcon icon={faUserTie} />
                        Admins
                    </Link>

                </li>
                <li>
                    <Link href='../../Dashboard/Agencies'>
                        <FontAwesomeIcon icon={faUsers} />
                        Tour Agencies
                    </Link>
                </li>
                <li>
                    <Link href='../../Dashboard/Guides'>
                        <FontAwesomeIcon icon={faUser} />
                        Tour Guides
                    </Link>
                </li>
                <li>
                    <Link href=''>
                        <FontAwesomeIcon icon={faChartLine} />
                        Generate Reports
                    </Link>
                </li>
                <li>
                    <Link href=''>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}
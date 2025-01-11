'use client'
import { faArrowRightFromBracket, faChartLine, faPlane, faSquarePollVertical, faUser, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';


export default function SideBar() {
    return (
        <div>

            <ul className="menu bg-primarycolor text-white w-56 h-screen text-center">
                <div className='mt-16'>
                    <FontAwesomeIcon icon={faPlane} width={100} color='white' />
                    <p className='text-lg'>Tour Finder</p>
                </div>
                <div className='h-12'></div>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faSquarePollVertical} />
                        Overview
                    </a>
                </li>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faUserTie} />
                        Admins
                    </a>
                </li>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faUsers} />
                        Tour Agencies
                    </a>
                </li>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faUser} />
                        Tour Guides
                    </a>
                </li>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faChartLine} />
                        Generate Reports
                    </a>
                </li>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}
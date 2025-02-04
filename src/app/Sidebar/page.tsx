'use client'
import { faArrowRightFromBracket, faChartLine, faPlane, faSquarePollVertical, faUser, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';


export default function SideBar(props: any) {
    const route = useRouter();

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/authentication/logout', {}, { withCredentials: true });

            if (response.status === 201) {
                alert('Log outed successfully!');
                route.replace('/Login')
            }

        } catch (error) {
            alert('An unexpected error occurred. Please try again.\n' + error);
        }
    }

    const checkValidity = async () => {
        try {
            const response = await axios.post('http://localhost:3000/authentication/logout', {}, { withCredentials: true });

            if (response.status != 201) {
                alert('Login Required!');
                route.replace('/Login')
            }

        } catch (error) {
            alert('An unexpected error occurred. Please try again.\n' + error);
        }
    }

    return (
        <div>
            <ul className="menu bg-primarycolor text-white w-56 h-screen text-center sticky top-0">
                <div>
                    <FontAwesomeIcon icon={faPlane} width={100} color='white' />
                    <p className='text-lg'>Tour Finder</p>
                </div>
                <div className='h-12'></div>
                <li>
                    <Link href='../Dashboard/Overview'>
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
                    <Link href='../../Dashboard/Reports'>
                        <FontAwesomeIcon icon={faChartLine} />
                        Generate Reports
                    </Link>
                </li>

                <li>
                    <Link href='../../Dashboard/ActivityLog'>
                        <FontAwesomeIcon icon={faChartLine} />
                        Activity Log
                    </Link>
                </li>

                <li>
                    <button
                        onClick={logout}
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}
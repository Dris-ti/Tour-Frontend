'use client';

import { faCheck, faPlug, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import '@fontsource/inter';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import ValidityCheck from '../../ValidityCheck/page'


const AdminPage = () => {
    // <ValidityCheck />
    const [admins, setAdmins] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const route = useRouter();

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/showAdmins',
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    setAdmins(response.data);
                } else {
                    if (response.status === 401) {
                        alert(response.statusText);
                        route.replace('/Login');
                    }
                    alert('Network or server error. Please try again. ');
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    route.replace('/Login');
                }
                alert('Network or server error. Please try again. ' + error);
            }
        };

        fetchAdmins();
    }, [open]);


    const addAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/admin/addAdmin', { email },
                { withCredentials: true }
            );

            if (response.status === 201) {
                alert('Admin added successfully!');
                copyToClipboard({ email, pass }); // Copy the generated password to the clipboard
                setOpen(false);
            }
            else {
                if (response.status === 401) {
                    alert(response.statusText);
                    route.replace('/Login');
                }
                alert('Network or server error. Please try again. ');
            }
            setEmail('')
            setPass('')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    route.replace('/Login');
                } else {
                    alert('An unexpected error occurred. Please try again.');
                }
            } else {
                console.error('Error:', error);
                alert('Network or server error. Please try again.');
            }
        }
    };





    const copyToClipboard = (data: any) => {
        const { email, pass } = data
        if (navigator.clipboard) {
            try {
                navigator.clipboard.writeText(`${email}\n${pass}`);
            }
            catch (e) {
                alert('Something went wrong while copying in clipboard!');
            }
        } else {
            alert('Clipboard API not supported in your browser.');
        }
    };

    const generatePassword = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        let password = '';
        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

        for (let i = 1; i <= 8; i++) {
            const char = Math.floor(Math.random() * str.length);
            password += str.charAt(char);
        }
        setPass(password);
    };



    return (
        <div>
            <div className="p-4 overflow-hidden z-0 absolute top-16">
                <div className="flex justify-between p-5 text-lg text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 rounded-lg mb-2">
                    <h1>Admins</h1>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-[82vw] text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-primarycolor dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Admin ID</th>
                                <th scope="col" className="px-6 py-3">Admin Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((user: any) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                >
                                    <td suppressHydrationWarning className="px-6 py-2">{user.id}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.name}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.email}</td>
                                    <td suppressHydrationWarning className="px-6 py-2">{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="fixed right-5 bottom-5">
                    <button
                        className="w-14 h-12 rounded-full bg-primarycolor text-white m-1"
                        onClick={() => setOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                <Modal open={open} onClose={() => {
                    setOpen(false);
                    setEmail('');
                    setPass('');
                }}>
                    <ModalDialog>
                        <DialogTitle>Add New Admin</DialogTitle>
                        <form onSubmit={addAdmin}>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        autoFocus
                                        required
                                        value={email}
                                        type='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        required
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <a
                                        onClick={(e) => generatePassword(e)}
                                        className="w-fit text-xs absolute right-0 pt-1 pr-1 hover:text-primarycolor"
                                        href="#"
                                    >
                                        Generate Password
                                    </a>
                                </FormControl>

                                <Button type="submit">Add and Copy</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </div>
        </div>

    );
};

export default AdminPage;

'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get('https://tour-backend-e75o.onrender.com/authentication/verifyToken', {
                    withCredentials: true,
                });

                if (response.status !== 200 || !response.data.authenticated) {
                    alert("Token verification failed");
                }
                else {
                    alert("Token verified");
                }

                console.log("User authenticated:", response.data.userEmail);
            } catch (error) {
                alert("Token verification failed");
                console.error('Redirecting to login:', error);
                router.push('/Login');
            }
        };

        verifyToken();
    }, [router]);

    return (
        <div>
        </div>
    )
}

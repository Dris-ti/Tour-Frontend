import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {

    // ============ To check validity of the token ============
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                // Call the backend to check if the user is authenticated
                const response = await axios.get('http://localhost:3000/authentication/verifyToken', {
                    withCredentials: true, // Send HttpOnly cookie
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
                router.push('/Login'); // Redirect if token is invalid
            }
        };

        verifyToken();
    }, [router]);

    // =================================================================
    return (
        <div>

        </div>
    )
}

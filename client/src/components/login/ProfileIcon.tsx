import { useState, useEffect } from 'react';

import { Nav } from "react-bootstrap"

import User from '../../components/shared/UserLogin'
import logout from "../../components/login/Logout"

import axios from 'axios';

import pfp from "../../assets/ABC_avatart-02.png"

import "./module.login.css"

interface UserData {
    email: string;
    name: string;
    createdAt: string;
    id: string;
    isCreator: boolean;
    preference: any;
    role: string;
    userPreferenceId: string | null;
    favBook: any;
}

export const ProfileIcon = () => {
    const [user, setUser] = useState<UserData | null>(null);

    const google = () => {
        window.open("http://localhost:5002/auth/google", "_self")
    }
    const handleLogout = async () => {
        await logout();

        setUser(null);

    };
    //experiement
    const fetchUserData = async () => {

        try {
            const response = await axios.get(`http://localhost:5002/user?list=${user?.email}`);
            if (response.status === 200) {
                const userData = response.data;
                console.log('sucess')
                setUser(userData);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        // Fetch initial user data when the component mounts
        fetchUserData();
    }, []);

    return (
        <div>
            <User setUser={setUser} />

            {user ? (
                <div className='pfp-container'>
                    <Nav.Link href="/profile"><img src={pfp} alt="profile image icon of a cartoon frog smiling" className="pfp-icon" /> </Nav.Link>
                    <Nav.Link href="/profile"> <button className='view-profile-btn'>View Profile</button> </Nav.Link>
                    <button onClick={handleLogout} className='auth-btn'>Logout</button>
                </div>
            ) : (
                <div className='pfp-container'>
                    <img src={pfp} alt="profile image icon of a cartoon frog smiling" className="pfp-icon" />
                    <button onClick={google} className='auth-btn'>Login</button>
                </div>
            )}

        </div>
    )
}

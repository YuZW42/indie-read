import { useState, useEffect } from 'react';

import { Nav } from "react-bootstrap"

import User from '../shared/UserLogin'
import logout from "./Logout"

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

    // const google = () => {
    //     window.open("https://indie-read-production.up.railway.app/auth/google", "_self")
    // }
    
    const handleLogout = async () => {
        await logout();

        setUser(null);

    };
    //experiement
    const fetchUserData = async () => {

        try {
            const response = await axios.get(`https://indie-read-production.up.railway.app/user?list=115640783162715523277`);
            //isntead of ${user?.email} we hard code it
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
        fetchUserData();
    }, []);

    return (
        <div>
            <User setUser={setUser} />

            {user ? (
                <div className='pfp-container'>
                    <Nav.Link href={`/profile/${user.id}`}><img src={pfp} alt="profile image icon of a cartoon frog smiling" className="pfp-icon" /> </Nav.Link>
                    <Nav.Link href={`/profile/${user.id}`}> <button className='view-profile-btn'>Spark! Profile</button> </Nav.Link>
                    <button onClick={handleLogout} className='auth-btn'>Logout</button>
                </div>
            ) : (
                <div className='pfp-container'>
                    <img src={pfp} alt="profile image icon of a cartoon frog smiling" className="pfp-icon" />
                    <button onClick={fetchUserData} className='auth-btn'>Login</button>
                </div>
            )}

        </div>
    )
}

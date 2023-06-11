import React, { useEffect, useState } from 'react';

const ProfileComponent: React.FC = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('http://localhost:9090/auth/api/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const email = await response.text();
            setEmail(email);
          } else {
            console.error('Error fetching profile:', response.status);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {email ? <p>Email: {email}</p> : <p>Loading...</p>}
    </div>
  );
};

export default ProfileComponent;

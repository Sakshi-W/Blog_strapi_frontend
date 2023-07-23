import React from 'react';
import { Button, Card, Grid, TextField } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constant';
import { useState, useEffect } from 'react';
import { getToken } from '../../helpers';
import '../../styles/fonts/fonts.css';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();

  // Create a copy of the user state to handle input changes
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  // Handle changes to the user data
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Update the updatedUser state when the user state changes
  useEffect(() => {
    setUpdatedUser({ ...user });
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const responseData = await response.json();

      setUser(responseData);
      // Update with equivalent MUI notification component
      alert('Data saved successfully!');
    } catch (error) {
      console.error(error);
      // Update with equivalent MUI notification component
      alert('Error while updating the profile!');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Replace with MUI CircularProgress
  }

  return (
    <div style={{ padding: '10px', marginTop: '2px' }}>
      <Card className="profile_page_card">
        <form onSubmit={handleProfileUpdate}>
          <Grid paddingTop={1} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="Username"
                name="username"
                variant="outlined"
                required
                fullWidth
                value={updatedUser?.username || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="Email"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={updatedUser?.email || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="Avatar Url"
                name="avatar_url"
                variant="outlined"
                fullWidth
                value={updatedUser?.avatar_url || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="About"
                name="about"
                variant="outlined"
                required
                fullWidth
                multiline
                minRows={6}
                maxRows={6}
                value={updatedUser?.about || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="Twitter Username"
                name="twitter_username"
                variant="outlined"
                fullWidth
                value={updatedUser?.twitter_username || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="LinkedIn Username"
                name="linkedin_username"
                variant="outlined"
                fullWidth
                value={updatedUser?.linkedin_username || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="Github Username"
                name="github_username"
                variant="outlined"
                fullWidth
                value={updatedUser?.github_username || ''}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ fontFamily: 'Gentinum_Plus' }}
                label="Website Url"
                name="website_url"
                variant="outlined"
                fullWidth
                value={updatedUser?.website_url || ''}
                onChange={handleUserChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: '25px' }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;

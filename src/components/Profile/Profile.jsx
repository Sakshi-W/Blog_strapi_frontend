import React from 'react';
import { Button, Card, Grid, TextField } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constant';
import { useState } from 'react';
import { getToken } from '../../helpers';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
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
    <div style={{ padding: '15px', marginTop: '10px' }}>
      <Card className="profile_page_card">
        <form onSubmit={handleProfileUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                required
                fullWidth
                value={user?.username || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={user?.email || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Avatar Url"
                name="avatar_url"
                variant="outlined"
                fullWidth
                value={user?.avatar_url || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="About"
                name="about"
                variant="outlined"
                required
                fullWidth
                multiline
                minRows={6}
                maxRows={6}
                value={user?.about || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Twitter Username"
                name="twitter_username"
                variant="outlined"
                fullWidth
                value={user?.twitter_username || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="LinkedIn Username"
                name="linkedin_username"
                variant="outlined"
                fullWidth
                value={user?.linkedin_username || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Github Username"
                name="github_username"
                variant="outlined"
                fullWidth
                value={user?.github_username || ''}
                // onChange implementation required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Website Url"
                name="website_url"
                variant="outlined"
                fullWidth
                value={user?.website_url || ''}
                // onChange implementation required
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

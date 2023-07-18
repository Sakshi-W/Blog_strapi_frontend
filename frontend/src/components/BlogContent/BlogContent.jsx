import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const RootContainer = styled('div')({
  width: '100%',
  paddingBottom: '10px',
  backgroundColor: '#f9f9f9',
  backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJ5IktHDg0fMVPXyozK4Te4Bt9v2aDj55NZxMRnpGhk1FginlOg2pPOXC8iy4H1OriL0&usqp=CAU)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

const ContentContainer = styled('div')({
  maxWidth: '1240px',
  margin: '0 auto',
});

const GridContainer = styled(Grid)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
  padding: '4px',
  paddingTop: '20px',
  color: 'black',
  '& > *': {
    gridColumn: 'span 2',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
    paddingTop: '20px',
  },
});

const Image = styled('img')({
  height: '224px',
  width: '100%',
  objectFit: 'cover',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2xl',
  marginTop: '1px',
  paddingTop: '5px',
});

const Content = styled(Typography)({
  paddingTop: '5px',
});

export default function BlogContent() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:1337/api/blogs/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data);
        setBlog(data.attributes);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state while fetching the data
  }

  if (!blog) {
    return <p>not found</p>; // Don't render anything if the blog data is not available
  }

  return (
    <RootContainer>
      <ContentContainer>
        <GridContainer container>
          <Grid item xs={12} sm={12} md={8}>
            {blog.coverImg && (
              <Image
                src={`http://localhost:1337${blog.coverImg.url}`}
                alt="Blog Cover"
              />
            )}
            <Title variant="h1">{blog.blogTitle}</Title>
            <Content>{blog.blogContent}</Content>
          </Grid>
        </GridContainer>
      </ContentContainer>
    </RootContainer>
  );
}

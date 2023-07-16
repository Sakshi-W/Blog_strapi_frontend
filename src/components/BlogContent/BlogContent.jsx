// BlogContent.jsx

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const RootContainer = styled('div')({
  width: '100%',
  paddingBottom: '10px',
  backgroundColor: '#f9f9f9',
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

function BlogContent() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/blogs/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data);
        setBlog(data);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [id]);

  if (!blog) {
    return <Typography variant="h2">Blog not found</Typography>;
  }

  return (
    <RootContainer>
      <ContentContainer>
        <GridContainer container>
          <Grid item xs={12} sm={12} md={8}>
            <Image src={blog.coverImg} alt="Blog Cover" />
            <Title variant="h1">{blog.blogTitle}</Title>
            <Content>{blog.blogContent}</Content>
          </Grid>
        </GridContainer>
      </ContentContainer>
    </RootContainer>
  );
}

export default BlogContent;

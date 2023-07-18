import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import BlogContent from '../BlogContent/BlogContent';

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
    gridColumn: 'span 1',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
    paddingTop: '20px',
  },
});

const Image = styled('img')({
  height: '500px',
  width: '100%',
  objectFit: 'cover',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginTop: '1px',
  paddingTop: '5px',
});

const Description = styled(Typography)({
  paddingTop: '5px',
});

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/blogs')
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data);
        setBlogs(data.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  return (
    <RootContainer>
      <ContentContainer>
        {blogs.length > 0 ? (
          <GridContainer container>
            {blogs.map(blog => (
              <Grid key={blog.id} item xs={12} sm={4}>
                <Link to={`/blog/${blog.id}`}>
                  <div>
                    {blog.attributes.coverImg && (
                      <Image
                        src={`http://localhost:1337${blog.attributes.coverImg.url}`}
                        alt="Blog Cover"
                      />
                    )}
                    <Title variant="h3">{blog.attributes.blogTitle}</Title>
                    <Description>{blog.attributes.blogDesc}</Description>
                  </div>
                </Link>
              </Grid>
            ))}
          </GridContainer>
        ) : (
          <p>No blogs found</p>
        )}
      </ContentContainer>
    </RootContainer>
  );
};

export default Blog;

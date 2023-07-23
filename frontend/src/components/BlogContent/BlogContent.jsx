import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/AppFooter/AppFooter';
import AppHeader from '../AppHeader/AppHeader';

const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMlRnalLvKNKpdmJxQqOYDCml5SoKkcq4g-g&usqp=CAU";

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:1337/api/blogs/${id}?populate=*`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.attributes) {
          setBlog(data.data.attributes);
          setIsLoading(false);
        } else {
          console.error('Blog data not found');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',alignItems: 'center', justifyContent: 'center' }}>
     
      <div style={{ flex: '1', paddingBottom: '100px',textAlign: 'center', maxWidth: '800px'  }}>
        <h1 style={{paddingBottom:'20px', alignItems:'center', fontSize:'2.4rem', textDecoration:'underline'}}>{blog.blogTitle}</h1>
        <p  style={{fontSize:'1.9rem'}}>{blog.blogDesc}</p>
        {blog.coverImg1 && blog.coverImg1.data && blog.coverImg1.data.attributes && blog.coverImg1.data.attributes.url ? (
          <img
            src={`http://localhost:1337${blog.coverImg1.data.attributes.url}`}
            alt="Cover Image"
            style={{ width: '100%', maxWidth: '1000px' }}
          />
        ) : (
          <div>
            {/* Display the default image */}
            <img
              src={defaultImageUrl}
              alt="Default Cover Image"
              style={{ width: '100%', maxWidth: '500px' }}
            />
          </div>
        )}
        <p style={{fontSize:'1.7rem'}}>{blog.blogContent}</p>
      </div>
      
    </div>
  );
};

export default BlogContent;

import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>Blogs</h2>
      {blogs.length > 0 ? (
        <div>
          {blogs.map(blog => (
            <div key={blog.id}>
              <h3>{blog.attributes.blogTitle}</h3>
              <p>{blog.attributes.blogDesc}</p>
              <p>{blog.attributes.blogContent}</p>
              {blog.attributes.coverImg && (
                <img src={`http://localhost:1337${blog.attributes.coverImg.url}`} alt="Blog Cover" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default Blog;

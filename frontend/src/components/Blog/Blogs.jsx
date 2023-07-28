import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import AccessDenied from "../../pages/AccessDenied/AccessDenied";

const RootContainer = styled("div")({
  width: "100%",
  paddingBottom: "10px",
  display: "flex",
  alignItems: "center",
  minHeight: "100vh",
});

const ContentContainer = styled("div")({
  maxWidth: "1500px",
  margin: "0 auto",
});

const GridContainer = styled(Grid)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "20px",
  padding: "4px",
  paddingLeft: "10px",
  color: "black",
  "& > *": {
    gridColumn: "span 1",
  },
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
    paddingTop: "10px",
  },
});

const Image = styled("img")({
  maxWidth: "700px",
  height: "200px",
  width: "400px",
  objectFit: "cover",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  marginTop: "1px",
  paddingTop: "5px",
  color: "black",
});

const Description = styled(Typography)({
  paddingTop: "8px",
  color: "black",
});

const defaultImageURL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMlRnalLvKNKpdmJxQqOYDCml5SoKkcq4g-g&usqp=CAU";

const Blog = () => {
  const { userHasReadPermission } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:1337/api/blogs?populate=*")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          console.log("Response data:", data);
          setBlogs(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RootContainer>
      <ContentContainer>
        {blogs.length > 0 ? (
          <GridContainer container>
            {blogs.map((blog) => (
              <Grid key={blog.id} item xs={12} sm={4}>
                {userHasReadPermission ? (
                  <Link to={`/blog/${blog.id}`}>
                    <div>
                      {blog.attributes.coverImg1 &&
                      blog.attributes.coverImg1.data ? (
                        <Image
                          src={`http://localhost:1337${blog.attributes.coverImg1.data.attributes.url}`}
                          alt="Blog Cover"
                        />
                      ) : (
                        <Image src={defaultImageURL} alt="Default Blog Cover" />
                      )}
                      <Title variant="h3" style={{ fontFamily: "Proza_Libre" }}>
                        {blog.attributes.blogTitle}
                      </Title>
                      <Description style={{ fontFamily: "Proza_Libre" }}>
                        {blog.attributes.blogDesc}
                      </Description>
                    </div>
                  </Link>
                ) : (
                  <AccessDenied />
                )}
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

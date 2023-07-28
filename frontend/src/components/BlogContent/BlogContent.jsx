import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

import AccessDenied from "../../pages/AccessDenied/AccessDenied";
import { useAuthContext } from "../../context/AuthContext";

const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMlRnalLvKNKpdmJxQqOYDCml5SoKkcq4g-g&usqp=CAU";

const RootContainer = styled("div")({
  // Add your styles for the root container
});

const ContentContainer = styled("div")({
  // Add your styles for the content container
});

const BlogContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "100px", // Adjust as needed
});

const BlogTitle = styled("h1")({
  fontSize: "2.5rem",
  fontWeight: "bold",
  textDecoration: "underline",
  paddingBottom: "20px",
});

const BlogDescription = styled("p")({
  fontSize: "1.9rem",
  paddingBottom: "20px",
});

const BlogImage = styled("img")({
  width: "100%",
  maxWidth: "1000px",
});

const BlogContentText = styled("p")({
  fontSize: "1.7rem",
  textAlign: "left",
  padding: "0 30px",
  maxWidth: "1300px", // Adjust as needed
});

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user, userHasReadPermission } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserPermission = () => {
      // Check if the user is authenticated
      if (!user) {
        // If the user is not authenticated, redirect to the sign-in page
        navigate("/signin");
        return;
      }

      if (!userHasReadPermission()) {
        // If the user doesn't have the "blogsread" permission, redirect to the access denied page
        navigate("/access-denied");
      } else {
        // If the user has the required permission, fetch the blog data
        fetchBlogData();
      }
    };

    const fetchBlogData = async () => {
      try {
        const blogDataResponse = await fetch(
          `http://localhost:1337/api/blogs/${id}?populate=*`
        );
        const blogData = await blogDataResponse.json();

        if (blogData.data && blogData.data.attributes) {
          setBlog(blogData.data.attributes);
        } else {
          console.error("Blog data not found");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setIsLoading(false);
      }
    };

    checkUserPermission();
  }, [id, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userHasReadPermission()) {
    return <AccessDenied />;
  }

  return (
    <RootContainer>
      <ContentContainer>
        {userHasPermission ? (
          // If the user has permission, show the blog content as before
          <BlogContainer>
            <BlogTitle>{blog.blogTitle}</BlogTitle>
            <BlogDescription>{blog.blogDesc}</BlogDescription>
            {blog.coverImg1 &&
            blog.coverImg1.data &&
            blog.coverImg1.data.attributes &&
            blog.coverImg1.data.attributes.url ? (
              <BlogImage
                src={`http://localhost:1337${blog.coverImg1.data.attributes.url}`}
                alt="Cover Image"
              />
            ) : (
              <BlogImage src={defaultImageUrl} alt="Default Cover Image" />
            )}
            <BlogContentText>{blog.blogContent}</BlogContentText>
          </BlogContainer>
        ) : (
          // If the user doesn't have permission, show the Access Denied component
          <AccessDenied />
        )}
      </ContentContainer>
    </RootContainer>
  );
};

export default BlogContent;

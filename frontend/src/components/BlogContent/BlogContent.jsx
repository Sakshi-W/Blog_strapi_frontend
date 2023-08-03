import React, { useEffect, useState , useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled, width } from "@mui/system";
import { Button, Card, Grid, TextField, Snackbar, CircularProgress } from "@mui/material";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import '../../styles/fonts/fonts.css'


import AccessDenied from "../../pages/AccessDenied/AccessDenied";
import { AuthContext } from "../../context/AuthContext";

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
  marginTop: "-90px",
});

const BlogDescription = styled("p")({
  fontSize: "1.9rem",
  paddingBottom: "20px",
  marginRight:'50px',
  marginLeft:'80px',
});

const BlogImage = styled("img")({
  width: "100%",
  maxWidth: "1200px",
});

const BlogContentText = styled("p")({
  fontSize: "1.7rem",
  textAlign: "left",
  padding: "0 30px",
  maxWidth: "1200px", // Adjust as needed
});

const BlogContent = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const { id } = useParams();
  const [blog, setBlog] = useState({});
  
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const { user,setUser } = useContext(AuthContext);
  useEffect(() => {
    // Fetch blog data
    fetch(`http://localhost:1337/api/blogs/${id}?populate=*`)
      .then(response => response.json())
      .then(data => {
        console.log("Blog Data Response:", data);
        if (data.data && data.data.attributes) {
          setBlog(data.data.attributes);
        } else {
          console.error('Blog data not found');
        }
        // Fetch user data after fetching blog data
        fetch(`http://localhost:1337/api/users/${id}?populate=*`)
          .then(response => response.json())
          .then(data => {
            setUser(data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching user:', error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Add a listener for the window.onload event
    window.onload = () => {
      // When everything on the page, including the iframe content, is loaded, set the iframeLoading state to false
      setIframeLoading(false);
    };
    // Clean up the event listener on component unmount
    return () => {
      window.onload = null;
    };
  }, []);
  
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (user && user.BlogsRead) {
    return (
      <BlogContainer>
        <BlogTitle>{blog.blogTitle}</BlogTitle>
        <BlogDescription>{blog.blogDesc}</BlogDescription>
        {blog.coverImg1 && blog.coverImg1.data && blog.coverImg1.data.attributes && blog.coverImg1.data.attributes.url ? (
          <BlogImage
            src={`http://localhost:1337${blog.coverImg1.data.attributes.url}`}
            alt="Cover Image"
          />
        ) : (
          <BlogImage src={defaultImageUrl} alt="Default Cover Image" />
        )}
        <div style={{marginTop:'50px'}}>
        <BlogContentText>{blog.blogContent}</BlogContentText>
          </div>
        <div style={{width:'1200px', height:'600px', marginTop:'50px'}}>
        <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={`http://localhost:1337${blog.compImg1.data[0].attributes.url}`}
            alt="Cover Image One"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={`http://localhost:1337${blog.compImg1.data[1].attributes.url}`}
            alt="Default Cover Image"
          />
        }
        position={sliderPosition}
        onPositionChange={(position) => setSliderPosition(position)}
        style={{
          display: "flex",
          height: "50vh",
        }}
      />
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", marginTop: "-30px", width: "1200px" }}>
          {/* Loader for the iframe */}
          {iframeLoading ? (
            <CircularProgress />
          ) : (
            <iframe
            title="slider"
            width="1200"
            height="600"
            src="https://google.earthengine.app/view/split-panel"
            frameBorder="0"
            allowFullScreen
          />
          )}
        </div>
        <div
          style={{ marginLeft: '50px', marginRight: '50px', fontFamily: 'Gentinum_Plus', marginTop: '50px', width: '1200px' }}>
          <h2>gsajgd aoidsaho aoidaj dpoaij paoi das 9a8shd aodoaud aoid aoiud dguskd iaugdsi au diuahd audsha isdha iuds aiudgha iudhi ae;fei fh; efsiugwf ahgef wouafyewiu  aoid aoid oasij d </h2>
        </div>
      </BlogContainer>
    );
  }
  
  // If user BlogsRead value is false, render the access denied page
  return <AccessDenied />;
};

export default BlogContent;

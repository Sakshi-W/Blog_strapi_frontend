import React from "react";
import "../../components/Blog/Blog.css";
import Blog from "../../components/Blog/Blogs";
import "../../styles/fonts/fonts.css";
import AppHeader from "../../components/AppHeader/AppHeader";
import Footer from "../../components/AppFooter/AppFooter";

const Section = ({ layout, imageUrl, altText, text }) => {
  if (layout === "imageLeft") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <img
          src={imageUrl}
          alt={altText}
          style={{ width: "50%", height: "600px" }}
        />
        <div
          style={{
            flex: "1",
            paddingLeft: "20px",
            maxWidth: "50%",
          }}
        >
          <p
            className="paragraph"
            style={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    );
  } else if (layout === "imageRight") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <div
          style={{
            flex: "1",
            paddingRight: "20px",
            maxWidth: "50%",
          }}
        >
          <p
            className="paragraph"
            style={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
            }}
          >
            {text}
          </p>
        </div>
        <img
          src={imageUrl}
          alt={altText}
          style={{ width: "50%", height: "600px" }}
        />
      </div>
    );
  } else {
    // Default to paragraph on the left if layout prop is not provided or incorrect
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <img
          src={imageUrl}
          alt={altText}
          style={{ width: "50%", height: "600px" }}
        />
        <div
          style={{
            flex: "1",
            paddingLeft: "20px",
            maxWidth: "50%",
          }}
        >
          <p
            className="paragraph"
            style={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    );
  }
};

export default function Home({ blogs }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <h2
          className="custom-heading"
          style={{
            paddingLeft: "100px",
            paddingRight: "100px",
            fontSize: "5rem",
            fontFamily: "Cormorant_Garamond",
          }}
        >
          Hello World, sgdjhska skga
        </h2>

        <Section
          layout="imageLeft"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lm4YbDAmSMNTaiSh52I-b2y0-7myiP1GTg&usqp=CAU"
          altText="Image"
          text="Lorem ipsum dolor sit amet. Et consectetur repellendus et asperiores earum qui asperiores porro. Ut magni illo et saepe libero non voluptatem soluta aut temporibus velit aut aperiam itaque est dolores natus ut commodi quia. Eos voluptatem maxime id delectus exercitationem in dolor quaerat qui tenetur numquam At saepe voluptatum ut ipsum provident quo eius maiores. Et sapiente alias aut veritatis animi ut veritatis voluptates sed voluptatem"
        />

        <div
          style={{
            position: "relative",
            paddingTop: "30px",
            color: "white",
            textAlign: "center",
            backgroundColor: "#e0f7fa",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "300px",
          }}
        >
          {/* ... */}
        </div>

        <Section
          layout="imageRight"
          imageUrl="https://i.pinimg.com/originals/f7/75/7d/f7757d5977c6ade5ba352ec583fe8e40.jpg"
          altText="Image"
          text="Lorem ipsum dolor sit amet. Et consectetur repellendus et asperiores earum qui asperiores porro. Ut magni illo et saepe libero non voluptatem soluta aut temporibus velit aut aperiam itaque est dolores natus ut commodi quia. Eos voluptatem maxime id delectus exercitationem in dolor quaerat qui tenetur numquam At saepe voluptatum ut ipsum provident quo eius maiores. Et sapiente"
        />
        {/* ... */}

        <div
          style={{
            fontSize: "2rem",
            fontFamily: "Ysabeau_Office",
            marginLeft: "60px",
            marginRight: "60px",
          }}
        >
          <h3>
            dihfh soi ahsida odapisdhaosida oaihdaoi daiohdaoi daipo daipjp I
            Pojd POD hdsiu DIAGUDUOA FS DPOJ Poiho fdoihsaiud ao dhaoudh
            aoidhaso da idjao
          </h3>
        </div>
        <div style={{ paddingTop: "5rem" }}>
          <Blog blogs={blogs ? blogs : ""} />
        </div>
        <div
          style={{
            fontSize: "2rem",
            fontFamily: "Ysabeau_Office",
            marginLeft: "60px",
            marginRight: "60px",
          }}
        >
          <h3>
            sdiua agisud aisua dyuha ioa sbdka dhuas ao oihds oihay IYGS
            Aoisujpasd aosidh syigs aiudga 9duoas sdhaudsh aoduao idjsa doishd o
          </h3>
        </div>
      </div>
    </>
  );
}
import React from 'react';
import '../../components/Blog/Blog.css';
import Blog from '../../components/Blog/Blogs';
import '../../styles/fonts/fonts.css'; 
export default function Home({ blogs }) {
  return (
    <>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <h2 className="custom-heading" style={{fontSize:'3rem', fontFamily: 'Proza_Libre'}}>Hello World</h2>
        <p className="paragraph" style={{fontSize:'1.6rem', paddingLeft:'80px', paddingRight:'40px', paddingTop:'2px', fontFamily:'Poppins'}}>
          hjkjsdfhkjshdk hsdkuadhakushdak iuadhyasiudhaiudha haidwuhadsiwuhwsu hiushaiduah swhadiudhishu
          iuhsiaudhai geskhfk hdsiajdlsjd iudpadj pa; djwpdoJD dSed ut perspiciatis unde omnis iste natus 
          error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
           inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam volupta
           tem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui r
           atione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore m
            agnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corp
            oris suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure repre
            henderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum 
            fugiat quo voluptas nulla pariatur?"wlIHDOidh iugdw giduasw dHSdiupD shYdh OSIHOidy oSDIOIdsuoSDY 
            OIDH AODSIO odhyWDOiu posi aof pofu spdhysi lsdihfl
        </p> 
        <div style={{ paddingTop: '9rem' }}>
          <Blog blogs={blogs ? blogs : ''} />
        </div>
      </div>
      
    </>
  );
}

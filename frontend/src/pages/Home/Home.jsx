import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import '../../components/Blog/Blog.css';
import Blog  from '../../components/Blog/Blog';
import './Home.css';

export default function Home({blogs}) {
  

  return (
    <>
      <AppHeader />
      <div>
        <h2 color="black" >Hello World</h2>
        <p className="paragraph">
          hjkjsdfhkjshdk hsdkuadhakushdak iuadhyasiudhaiudha haidwuhadsiwuhwsu hiushaiduah swhadiudhishu
          iuhsiaudhai
        </p>
        <div style={{ paddingTop: '15rem',}}>
          <Blog  blogs={blogs?blogs:""}/>
        </div>
      </div>
    </>
  );
}

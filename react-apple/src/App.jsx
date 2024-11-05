import React from 'react'
import Header from './componet/Header'
import "./commonResource/css/styles.css";
import "./commonResource/css/bootstrap.css";
import Footer from './componet/Footer';
import { Routes, Route } from 'react-router-dom';
import Mac from './Pages/Mac/Mac';
import Four04 from './Pages/Four04/Four04';
import Productpage from './Pages/Productpage/Productpage';
import Iphone from './Pages/Iphone/iphone';
import Main from './componet/Main/Main';
import Shared from './componet/Shared/Shared';
import Watch from './Pages/Watch/Watch';
import Tv from './Pages/Tv/Tv';
import Ipad from './Pages/Ipad/Ipad';
import Music from './Pages/Music/Music';
import SharedVideo from './componet/SharedVideo/SharedVideo';


function App() {

  return (
    <>
     <Header/>
     <br></br>
     <br></br>
     <Routes>
      <Route path="/" element={<Shared/>}>
      <Route path="/" element={<Main/>}></Route>
     <Route path="/mac" element={<Mac/>}></Route>
     <Route path="/iphone" element={<Iphone/>}></Route>
     <Route path="/ipad" element={<Ipad/>}></Route>
     <Route path="/iphone/:pid" element={<Productpage />} />
     <Route path="/watch" element={<Watch/>}></Route>
     <Route path="/" element={<SharedVideo/>}>
     <Route path="music" element={<Music/>}></Route>
     <Route path="tv" element={<Tv/>}></Route>
     </Route>
    
     <Route path="*" element={<Four04 />} /> {/* Catch-all route for 404 */}
     </Route>
     </Routes>
    </>
  )
}

export default App

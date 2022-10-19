import React from "react";
import Navbar2 from "./components/Navbar2";
import Cards from "./components/Cards/Cards"
import Footer from "./components/Footer";
import Carousel2 from "./components/Carousel2";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Karta from './components/Cards/karta'



function App() {
  return (
    <div>
      <Navbar2 />
      <Carousel2 />
      <Container fluid>
        <Cards />
      </Container>
      
      <Footer />
    </div>
  );
}

export default App;

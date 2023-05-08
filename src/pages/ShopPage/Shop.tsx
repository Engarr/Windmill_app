import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Shop = () => {
  const prams = useParams();
  const category = prams.category;

  const [products, setProducts] = useState({});

  const fetchProducts = async()=>{
    const response =  await fetch("http://localhost:8080/api/feed")
  }


  return (
    <section id="sklep">
      <div> SKLEP</div>
    </section>
  );
};

export default Shop;

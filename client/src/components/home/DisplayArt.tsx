// import React from 'react';
import products from '../../../../server/outputs/products.json'

export const DisplayArtwork = () => {
  interface ProductInfo {
    title: string;
    cost: string;
    desc: string;
    link: string;
    img_url: string;
  }

  const data: ProductInfo[] = products;

  return (
    <div>
      <h1>Artworks:</h1>
      <div>
        {data.map((product, index) => (
          <div key={index}>
            <h2>{product.title}</h2>
            <p>Cost: {product.cost}</p>
            <img src={product.img_url} alt={product.title} />
            <p>
              <a href={product.link}>Link</a>
            </p>
            <p>Description: {product.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

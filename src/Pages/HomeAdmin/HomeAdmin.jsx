import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout"; 
import { ProductDetail } from "../../components/ProductDetail.jsx";




import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";

const HomeAdmin = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []); 

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div>
        <section className="section">
          <div className="container">
            <h2 className="title is-3">Our Products</h2>
            <div className="columns is-multiline">
              {products.map((product, index) => (
                <div key={index} className="column is-one-third">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card"
                    onClick={() => openProductDetail(product)}
                  >
                    <div className="card-content">
                      <p className="title is-4">{product.name}</p>
                      <p className="subtitle is-6">{product.description}</p>
                      <p className="has-text-weight-bold">
                        Price: {product.price}
                      </p>
                      <p>Quotas: {product.quotas}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProductDetail
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductDetail}
        />
      </div>
    </Layout>
  );
};

export { HomeAdmin };
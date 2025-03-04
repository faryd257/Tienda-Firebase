
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { ProductDetail } from "../../components/ProductDetail";
import { db } from "../../../config/firebase";






import { collection, getDocs } from "firebase/firestore";


import "./Home.css"; 

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }
    };
    obtenerProductos();
  }, []);


  const openDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  
  const closeDetail = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <Layout>
     
      <header className="bg-dark text-white py-5 mb-4">
        <div className="container">
          <h1 className="display-4 fw-bold text-center mb-3">
            ¡Bienvenidos a Nuestra Tienda Online!
          </h1>
          <p className="lead text-center">
            Descubre nuestras categorías más destacadas y encuentra productos que se ajustan a tus necesidades.
          </p>
        </div>
      </header>

      
      <div className="container mb-5">
        <h2 className="text-center mb-4">Nuestros Productos</h2>

        {productos.length === 0 && (
          <p className="text-center">Cargando productos...</p>
        )}

       
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productos.slice(0, 4).map((producto) => (
            <div className="col" key={producto.id}>
              <div
                className="card border-0 shadow h-100 rounded-3"
                style={{ cursor: "pointer" }}
                onClick={() => openDetail(producto)}
              >
                <div className="card-body p-4">
                  <h5 className="card-title text-primary fw-bold">
                    {producto.name}
                  </h5>
                  <p className="card-text text-secondary mb-2">
                    {producto.description}
                  </p>
                  <p className="mb-1 text-dark fw-bold">
                    Precio: {producto.price}
                  </p>
                
                  {producto.sku && (
                    <p className="mb-0 text-dark">
                      SKU: {producto.sku}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <ProductDetail
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeDetail}
      />
    </Layout>
  );
};

export { Home };

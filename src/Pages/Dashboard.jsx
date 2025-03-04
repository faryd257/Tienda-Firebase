import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";


import { Layout } from "../components/Layout/Layout";
import { ProductDetail } from "../components/ProductDetail";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    quotas: "",
    sku: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const productsCollection = collection(db, "productos");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts();
  }, [productsCollection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const productDoc = doc(db, "productos", editingId);
      await updateDoc(productDoc, formData);
      setEditingId(null);
    } else {
      await addDoc(productsCollection, formData);
    }
    setFormData({
      name: "",
      description: "",
      longDescription: "",
      price: "",
      quotas: "",
      sku: "",
    });
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;
    const productDoc = doc(db, "productos", id);
    await deleteDoc(productDoc);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

 
  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      longDescription: "",
      price: "",
      quotas: "",
      sku: "",
    });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const openDetail = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const closeDetail = () => {
    setSelectedProduct(null);
    setDetailModalOpen(false);
  };

  return (
    <Layout>
      <div className="container my-5">
        <h1 className="text-center mb-4">Panel de Administración</h1>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm mb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Descripción Corta</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Descripción Larga</label>
                <textarea
                  className="form-control"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Precio</label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Cuotas</label>
                <input
                  className="form-control"
                  type="number"
                  name="quotas"
                  value={formData.quotas}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">SKU</label>
                <input
                  className="form-control"
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary mx-2" type="submit">
                  {editingId ? "Actualizar Producto" : "Agregar Producto"}
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cuotas</th>
                <th>SKU</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>${p.price}</td>
                  <td>{p.quotas}</td>
                  <td>{p.sku || "-"}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm mx-2"
                      onClick={() => openDetail(p)}
                    >
                      🔍 Ver
                    </button>
                    <button
                      className="btn btn-info btn-sm mx-2"
                      onClick={() => handleEdit(p)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-2"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑 Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductDetail
        product={selectedProduct}
        isOpen={detailModalOpen}
        onClose={closeDetail}
      />
    </Layout>
  );
};

export { Dashboard };
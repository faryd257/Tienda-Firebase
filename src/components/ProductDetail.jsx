// 📂 src/components/ProductDetail.jsx
import PropTypes from "prop-types";
import { useEffect } from "react";

export const ProductDetail = ({
  product = {},
  isOpen = false,
  onClose = () => {},
}) => {
 
  if (!isOpen || !product) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
  
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />
      <div className="modal fade show" style={{ display: "block" }} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{product.name || "Producto"}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              {Object.entries(product).map(([key, value]) => (
                value && (
                  <p key={key}>
                    <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                  </p>
                )
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

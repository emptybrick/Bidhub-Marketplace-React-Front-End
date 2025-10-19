// frontend/src/components/ItemCard
// emptybrick was here
import { useState } from "react";

const ItemCard = (item) => {
//   const [activeModal, setActiveModal] = useState(null);

//   const handleCloseQuickView = (e) => {
//     e.preventDefault();
//     setActiveModal(null);
//   };

//   const handleShowQuickView = (e) => {
//     e.preventDefault();
//     const modal = e.target.dataset.target;
//     setActiveModal(modal);
//   };

// need to figure out css to implement modal quick view option above code is from previous project

  return (
    <div className="item-card" key={item.id}>
      <h3>
        <Link to={`/items/${item.id}`}>{item.title}</Link>
      </h3>
      {/* show product.image[0] + product name + product current bid*/}
      {item.category && <span className="badge">{item.category.name}</span>}
      <p>{item.description}</p>
      <button className="product-quickview" onClick={showModal}>
        Quick View
      </button>
      {/* on quickview show product details and product images */}
    </div>
  );
};

export default ItemCard;

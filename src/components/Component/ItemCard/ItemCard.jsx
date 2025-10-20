// frontend/src/components/ItemCard
// emptybrick was here
import { useState } from "react";
import '../../Views/ItemList/itemlist.css'

const ItemCard = ({item}) => {
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
    <div className="item-card">
      <div className="heading">
        <span>{item.item_name}</span>
        <span>
          <i className="fa.fa-heart-o"></i>
        </span>
      </div>
      <div className="box">ITEM IMAGE</div>
      <div className="info">{ item.description }</div>
      <div>Current Bid: ${ item.current_bid }</div>
    </div>
  );
};

export default ItemCard;

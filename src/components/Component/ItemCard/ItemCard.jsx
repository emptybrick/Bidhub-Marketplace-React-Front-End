import { useNavigate } from "react-router-dom";
import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const ItemCard = ({ item, isPlaceholder = false }) => {
  const navigate = useNavigate();

  const handleLink = () => {
    if (!isPlaceholder) {
      navigate(`/bidhub/marketplace/${item.id}`); // Navigate to the item detail page
    }
  };

  if (isPlaceholder) {
    return <div className="item-card placeholder" />;
  }
  return (
    <div className="item-card" onClick={() => handleLink()}>
      <div className="heading">
        <span>{item.item_name}</span>
        <span>
          <FavoriteButton itemId={item.id} />
        </span>
      </div>
      <div className="box">
        <img
          className="item-card-image"
          src="https://cdn.pixabay.com/photo/2015/02/08/17/42/marbles-628820_1280.jpg"
          alt=""
        />
        <div className="item-card-bottom">
          <div className="item-card-left">
            <div className="info">{item.description}</div>
            <div>Current Bid: ${item.current_bid}</div>
          </div>
          <div className="item-card-right">
            <button className="view-details">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

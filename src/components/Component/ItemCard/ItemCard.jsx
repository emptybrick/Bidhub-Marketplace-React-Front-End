import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const ItemCard = ({ item, isPlaceholder = false }) => {
  if (isPlaceholder) {
    return <div className="item-card placeholder" />;
  }
  return (
    <div className="item-card">
      <div className="heading">
        <span>{item.item_name}</span>
        <span>
          <FavoriteButton itemId={item.id} />
        </span>
      </div>
      <div className="box">ITEM IMAGE</div>
      <div className="info">{item.description}</div>
      <div>Current Bid: ${item.current_bid}</div>
    </div>
  );
};

export default ItemCard;

import { useNavigate } from "react-router-dom";
import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const ItemCard = ({ item, isPlaceholder = false, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleLink = () => {
    if (!isPlaceholder) {
      navigate(`/bidhub/marketplace/${item.id}`);
    }
  };

  console.log(user)

  if (isPlaceholder) {
    return <div className="item-card placeholder" />;
  }
  return (
    <div className="item-card">
      <div className="heading">
        <span>{item.item_name}</span>
        <span>
          {user.user ? (
            <FavoriteButton
              itemId={item.id}
              onFavoriteToggle={onFavoriteToggle}
            />
          ) : (
            ""
          )}
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
            {user.user ? (
              <button className="view-details" onClick={() => handleLink()}>
                View Details
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

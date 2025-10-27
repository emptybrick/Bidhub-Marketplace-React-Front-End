import "./modal.css";

const BidHistoryModal = ({ bidHistory, onClose }) => {
  return (
    <div className="bid-history-container">
      <div className="bid-history-subtitle">Bid History</div>
      <div className="bid-history">
        {bidHistory.length > 1 ? (
          <>
            <div className="bid-history-left">
              <div className="bid-history-modal-subtitle">Bid Amount</div>
              <div>___________</div>
              <ul>
                {bidHistory.map((bid) => (
                  <li>${bid.bid}</li>
                ))}
              </ul>
            </div>
            <div className="bid-history-right">
              <div className="bid-history-modal-subtitle">Bidder</div>
              <div>________</div>
              <ul>
                {bidHistory.map((bid) => (
                  <li>{bid.bidder}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bid-history-message">
            There are currently no bids on this item.
          </div>
        )}
      </div>
      <button className="form-close-btn" onClick={() => onClose()}>
        X
      </button>
    </div>
  );
};

export default BidHistoryModal;

import './modal.css'

const BidHistoryModal = ({ bidHistory, onClose }) => {
  console.log(bidHistory);
  return (
    <div className="bid-history-container"><div className="bid-history-subtitle">Bid History</div>
      <div className="bid-history">
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
      </div>
      <button className='bid-history-close' onClick={() => onClose()}>Close</button>
    </div>
  );
};

export default BidHistoryModal;

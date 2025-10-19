// frontend/src/components/Button
// emptybrick was here
// import { useContext } from "react";

const Button = ({ onClick, type = "button", className }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      Test Button
    </button>
  );
};

export default Button;

// onClick provides the function when button is clicked
// type only matters if type=submit is provided with button (for forms)
// className will be sent with buttons for color/size/shape as needed
// css will need to be created for different button classes (ie. success/warning/danger)
// current classNames in use: product-quickview (ItemCard),

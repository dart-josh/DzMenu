import React, { useState } from "react";
import ManageProduct from "../dialogs/ManageProduct";

const ManageProducts = () => {
  const [manageProductOpen, setManageProductOpen] = useState(true);
  const [activeProductInfo, setActiveProductInfo] = useState({
    productId: "Poo1",
    name: "Bottle cashew",
    price: "17500",
    category: "Juice",
    description: "Good product",
    image:
      "https://res.cloudinary.com/dzolib9yb/image/upload/v1761777981/del/products/ufrub5o5qykk0coa3xxj.png",
  });

  return (
    <div>
      ManageProducts
      <ManageProduct
        open={manageProductOpen}
        onClose={() => {
          setManageProductOpen(false);
          setActiveProductInfo(null);
        }}
        item={activeProductInfo}
      />
    </div>
  );
};

export default ManageProducts;

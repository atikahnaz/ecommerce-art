"use client";
import { useState, useContext, createContext, useEffect } from "react";

//can export more than one function

export const CartItems = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // get items from localstorage
  const [total, setTotal] = useState();

  useEffect(() => {
    const newTotal = items.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);
  console.log(items);

  // function to add items to cart
  const addItem = (product, quantity) => {
    const itemExist = items.find((item) => item.id == product.id);
    console.log(itemExist);
    console.log(quantity);
    if (itemExist) {
      console.log("items not new");
      setItems(
        items.map((item) =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      console.log("item new");
      setItems([...items, { ...product, quantity: quantity }]);
    }
  };

  const removeitem = (product) => {
    const selectedItem = items.find((item) => item.id == product.id);

    if (selectedItem.quantity == 1) {
      setItems(items.filter((item) => item.id != selectedItem.id));
    } else {
      setItems(
        items.map((item) =>
          item.id == selectedItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removefromcart = (product) => {
    const selectedItem = items.find((item) => item.id == product.id);
    if (selectedItem) {
      setItems(items.filter((item) => item.id != selectedItem.id));
    }
  };

  const clearcart = () => {
    setItems([]);
  };

  return (
    <CartItems.Provider
      value={{
        items,
        addItem,
        removeitem,
        clearcart,
        removefromcart,
        total,
      }}
    >
      {children}
    </CartItems.Provider>
  );
};

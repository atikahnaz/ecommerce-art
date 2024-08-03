"use client";
import { useState, useContext, createContext, useEffect } from "react";

//can export more than one function

export const CartItems = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // get items from localstorage
  const [total, setTotal] = useState();

  useEffect(() => {
    const totalQuantity = items.reduce((total, item) => {
      const totalItem = item.variations.reduce((sumItem, variation) => {
        return sumItem + (variation.quantity || 0);
      }, 0);

      return totalItem + total;
    }, 0);
    setTotal(totalQuantity);
  }, [items]);

  console.log(items);

  // function to add items to cart
  const addItem = (product, quantity, size) => {
    const itemExist = items.find((item) => item.id == product.id);
    console.log(itemExist);
    console.log(quantity);
    console.log(size);
    if (itemExist) {
      // iterate each item
      // for each item iterate the variations
      // find the same size
      // if size and quantity exist, add quantity
      // if size but quantity not exist, add new variable quantity

      setItems(
        items.map((item) => {
          if (item.id == product.id) {
            return {
              ...item,
              variations: item.variations.map((variation) => {
                if (variation.size == size) {
                  return {
                    ...variation,
                    quantity: (variation.quantity || 0) + quantity, // add quantity if it doesnt exist
                  };
                }
                return variation;
              }),
            };
          }
          return item;
        })
      );

      // setItems(
      //   items.map((item) => {
      //     return item.variations.map((variation) => {
      //       variation.size == size && variation.quantity
      //         ? { ...variation, quantity: variation.quantity + quantity }
      //         : variation;
      //     });
      //   })
      // );
      console.log("items not new");

      //before
      // setItems(
      //   items.map((item) =>
      //     item.id == product.id
      //       ? { ...item, quantity: item.quantity + quantity }
      //       : item
      //   )
      // );
    } else {
      console.log("item new");
      //setItems([...items, { ...product, quantity: quantity }]);
      setItems([
        ...items,
        {
          ...product,
          variations: product.variations.map((variation) => {
            if (variation.size == size) {
              return { ...variation, quantity: quantity };
            }
            return variation;
          }),
        },
      ]);
    }
  };

  const removeitem = (product, quantity, size) => {
    // const selectedItem = items.find((item) => item.id == product.id);

    // if (selectedItem.quantity == 1) {
    //   setItems(items.filter((item) => item.id != selectedItem.id));
    // } else {
    //   setItems(
    //     items.map((item) =>
    //       item.id == selectedItem.id
    //         ? { ...item, quantity: item.quantity - 1 }
    //         : item
    //     )
    //   );
    // }

    const itemExist = items.find((item) => item.id == product.id);
    console.log(itemExist);
    console.log(quantity);
    console.log(size);
    if (itemExist) {
      setItems(
        items.map((item) => {
          if (item.id == product.id) {
            return {
              ...item,
              variations: item.variations.map((variation) => {
                if (variation.size == size) {
                  return {
                    ...variation,
                    quantity: (variation.quantity || 0) - quantity, // add quantity if it doesnt exist
                  };
                }
                return variation;
              }),
            };
          }
          return item;
        })
      );
    }
  };

  const removefromcart = (product, size) => {
    const selectedItem = items.find((item) => item.id == product.id);
    if (selectedItem) {
      setItems(
        items.map((item) => {
          if (item.id == selectedItem.id) {
            return {
              ...item,
              variations: item.variations.map((variation) => {
                if (variation.size == size) {
                  return { ...variation, quantity: 0 };
                }
                return variation;
              }),
            };
          } else {
            return item;
          }
        })
      );
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

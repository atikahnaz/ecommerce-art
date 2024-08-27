"use client";
import { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./AuthContext";
import productInformation from "../public/data/products.json";

//can export more than one function

export const CartItems = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // get items from localstorage
  const [total, setTotal] = useState();

  // user login
  const { user } = useContext(UserContext);

  // function to fetch data cart_item
  const fetchItem = async () => {
    try {
      const response = await fetch(
        "https://artstore.infinityfreeapp.com/backend/item/get-items.inc.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        }
      );
      const data = await response.json();

      // setItem to data from database
      // format the data to match the local storage format
      // map data
      const formatItem = data.items.map((item, index) => {
        const productInfoExist = productInformation.find(
          (product) => product.id == item.product_id
        );

        if (productInfoExist) {
          return {
            ...productInfoExist,
            variations: productInfoExist.variations.map((variation) => {
              if (variation.size == item.size) {
                return { ...variation, quantity: item.quantity };
              }
              return variation;
            }),
          };
        }
      });
      setItems(formatItem);
    } catch (error) {}
  };

  // if user sign in, fetch cart items from database
  useEffect(() => {
    if (user) {
      console.log(user.id);

      fetchItem();
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  // set total when items changed
  useEffect(() => {
    const totalQuantity = items.reduce((total, item) => {
      const totalItem = item.variations.reduce((sumItem, variation) => {
        return sumItem + (variation.quantity || 0);
      }, 0);

      return totalItem + total;
    }, 0);
    setTotal(totalQuantity);
  }, [items, user]);

  // function to add items to cart
  const addItem = async (product, quantity, size) => {
    let price;
    const itemExist = items.find((item) => item.id == product.id);

    if (itemExist) {
      // iterate each items
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
                  price = variation.price;
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
    } else {
      setItems([
        ...items,
        {
          ...product,
          variations: product.variations.map((variation) => {
            if (variation.size == size) {
              price = variation.price;
              return { ...variation, quantity: quantity };
            }
            return variation;
          }),
        },
      ]);
    }

    //send data to the backend database if user is login
    if (user) {
      try {
        const response = await fetch(
          "https://artstore.infinityfreeapp.com/backend/item/update-cart.inc.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              product_id: product.id,
              size: size,
              quantity: quantity,
              price: price,
            }),
          }
        );

        const data = await response.json();
        if (data.status) {
          console.log("cart updated");
          fetchItem();
        } else {
          console.log("cart failed to update");
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  const removeitem = async (product, quantity, size) => {
    const itemExist = items.find((item) => item.id == product.id);

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

    // if user is login, remove and update item in database
    if (user) {
      try {
        const response = await fetch(
          "https://artstore.infinityfreeapp.com/backend/item/remove-items.inc.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              product_id: product.id,
              size: size,
              quantity: quantity,
            }),
          }
        );

        const data = await response.json();
        if (data.status) {
          console.log(data.message);
          fetchItem();
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("error to remove item");
      }
    }
  };

  const removefromcart = async (product, size) => {
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

    if (user) {
      try {
        const response = await fetch(
          "https://artstore.infinityfreeapp.com/backend/item/remove-items.inc.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              product_id: product.id,
              size: size,
            }),
          }
        );

        const data = await response.json();
        if (data.status) {
          console.log(data.message);
          fetchItem();
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("error to remove item");
      }
    }
  };

  const clearcart = async () => {
    setItems([]);
    if (user) {
      try {
        const response = await fetch(
          "https://artstore.infinityfreeapp.com/backend/item/remove-items.inc.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              product_id: null,
              size: null,
              quantity: null,
            }),
          }
        );

        const data = await response.json();
        if (data.status) {
          console.log(data.message);
          fetchItem();
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("error to remove item");
      }
    }
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

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

  // if user sign in, fetch cart items from database

  useEffect(() => {
    if (user) {
      console.log(user.id);
      const fetchItem = async () => {
        try {
          const response = await fetch(
            "http://localhost/Ecommerce_art_backend/backend/item/get-items.inc.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user_id: user.id }),
            }
          );
          const data = await response.json();
          // consolelog data from database
          console.log(data.status);
          console.log(data.message);
          console.log("here");
          console.log(data.items);

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
        } catch (error) {
          console.log("error retrieve items");
        }
      };
      console.log("fetchitem");
      fetchItem();
    }
  }, [user]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    // if (user) {
    //   console.log("user item");
    // } else {
    //   console.log("user item not login");
    //   const totalQuantity = items.reduce((total, item) => {
    //     const totalItem = item.variations.reduce((sumItem, variation) => {
    //       return sumItem + (variation.quantity || 0);
    //     }, 0);

    //     return totalItem + total;
    //   }, 0);
    //   setTotal(totalQuantity);
    // }
    const totalQuantity = items.reduce((total, item) => {
      const totalItem = item.variations.reduce((sumItem, variation) => {
        return sumItem + (variation.quantity || 0);
      }, 0);

      return totalItem + total;
    }, 0);
    setTotal(totalQuantity);
  }, [items, user]);

  console.log(items);

  // function to add items to cart
  const addItem = async (product, quantity, size) => {
    let price;
    const itemExist = items.find((item) => item.id == product.id);
    console.log(itemExist);
    console.log(quantity);
    console.log(size);
    console.log(product.variations[0].price);
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

      console.log("items not new");
    } else {
      console.log("item new");

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
    console.log(price);

    //send data to the backend database if user is login
    if (user) {
      try {
        console.log("login add item");
        const response = await fetch(
          "http://localhost/Ecommerce_art_backend/backend/item/update-cart.inc.php",
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
        } else {
          console.log("cart failed to update");
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  const removeitem = (product, quantity, size) => {
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

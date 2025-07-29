import React, { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {

    let no= 0;

  return <CartContext.Provider value={{no}} >{children}</CartContext.Provider>;
}

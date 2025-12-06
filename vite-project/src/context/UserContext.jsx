import React, { createContext, useState } from 'react'

export const dataContext=createContext(); 

const UserContext = ({children}) => {
  let [input,setInput]=useState("");
  let [showCart,setShowCart]=useState(false);
  let data={
  input,setInput,
  showCart,setShowCart
  }
  return (
    <div>
     <dataContext.Provider value={data}>
       {children}
     </dataContext.Provider>
    </div>
  )
}

export default UserContext

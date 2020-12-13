import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  /**
   * example userInfo:
   * userInfo = {
   *   email: customer@gmail.com
   *   id: 70402dcd-961a-3361-8bae-772294e3eb63
   *   type: 'CUSTOMER'
   * }
   * */ 
  return (
    <GlobalContext.Provider value={{userInfo, setUserInfo}}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;

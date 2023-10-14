import {createContext, useContext, useState} from 'react';

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export const GlobalProvider = props => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [farmId, setFarmId] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        farmId,
        userData,
        setUserId,
        setFarmId,
        setUserData,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

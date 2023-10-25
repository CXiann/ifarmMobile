import {createContext, useContext, useState} from 'react';

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export const GlobalProvider = props => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [farmId, setFarmId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        userId,
        farmId,
        userData,
        isLoading,
        currentWeatherData,
        setUserId,
        setFarmId,
        setUserData,
        setIsLoading,
        setCurrentWeatherData,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

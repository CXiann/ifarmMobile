import {createContext, useContext, useState} from 'react';

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export const GlobalProvider = props => {
  const [userId, setUserId] = useState(null);
  const [farmId, setFarmId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [farmName, setFarmName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        userId,
        farmId,
        userData,
        userName,
        farmName,
        isLoading,
        currentWeatherData,
        setUserId,
        setFarmId,
        setUserData,
        setUserName,
        setFarmName,
        setIsLoading,
        setCurrentWeatherData,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

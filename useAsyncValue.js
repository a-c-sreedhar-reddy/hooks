import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
export default function useValue(key) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  function getAsyncStorageValue() {
    AsyncStorage.getItem(key)
      .then(value => {
        setValue(value);
      })
      .catch(() => setValue(null))
      .finally(() => setLoading(false));
  }
  const setAsyncStorageValue = value => {
    AsyncStorage.setItem(key, value).finally(getAsyncStorageValue);
  };
  useEffect(getAsyncStorageValue, [key]);
  function removeAsyncStorageKey() {
    AsyncStorage.removeItem(key).finally(getAsyncStorageValue);
  }
  return [loading, value, setAsyncStorageValue, removeAsyncStorageKey];
}

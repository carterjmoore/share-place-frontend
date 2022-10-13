import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [loadedUsers, setLoadedUsers] = useState(undefined);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/users`);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;

import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceList = (props) => {
  const authCtx = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          {authCtx.userId === props.userId && (
            <>
              <h2>You haven't shared any places yet.</h2>
              <Button to="/places/new">Share Place</Button>
            </>
          )}
          {authCtx.userId !== props.userId && (
            <>
              <h2>This user hasn't shared any places yet.</h2>
            </>
          )}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;

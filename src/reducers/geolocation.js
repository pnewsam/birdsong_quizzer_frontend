import { UPDATE_GEOLOCATION } from "../actions/geolocation.js";

const INITIAL_STATE = {
  position: {}
};

const geolocation = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case UPDATE_GEOLOCATION:
      return {
        ...state,
        position: payload.position
      };
    default:
      return state;
  }
};

export const isLocationFetched = ({ geolocation }) =>
  geolocation.position.lat && geolocation.position.lon;

export default geolocation;

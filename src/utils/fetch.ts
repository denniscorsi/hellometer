export const fetchRestaurantIds = async (): Promise<number[]> => {
  return fetch("v1/restaurants/ids")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw err; // Re-throw the error to handle it in the component if needed
    });
};

export const fetchRestaurantData = async (activeRestaurant: number) => {
  return fetch(`v1/restaurants/${activeRestaurant}/data`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
};

// Favourites are stored as an array of unique property IDs.
export const addFavourite = (ids, id) => (ids.includes(id) ? ids : [...ids, id]);
export const removeFavourite = (ids, id) => ids.filter((x) => x !== id);
export const isInFavourites = (ids, id) => ids.includes(id);
import { addFavourite, removeFavourite, isInFavourites } from './favourites';

test('adds a property to favourites', () => {
  expect(addFavourite([], 'p1')).toEqual(['p1']);
});

test('does not add the same property twice', () => {
  expect(addFavourite(['p1'], 'p1')).toEqual(['p1']);
});

test('removes only the chosen property', () => {
  expect(removeFavourite(['p1', 'p2', 'p3'], 'p2')).toEqual(['p1', 'p3']);
});

test('isInFavourites reports membership', () => {
  expect(isInFavourites(['p1', 'p2'], 'p2')).toBe(true);
  expect(isInFavourites(['p1', 'p2'], 'p9')).toBe(false);
});
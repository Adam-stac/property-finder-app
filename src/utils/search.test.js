import { filterProperties, getPostcodeArea } from './search';

const properties = [
  { id: 'p1', type: 'House',    price: 300000, bedrooms: 3, added: '2025-01-10', location: 'Orpington BR5' },
  { id: 'p2', type: 'Flat',     price: 150000, bedrooms: 1, added: '2025-03-15', location: 'Camden NW1' },
  { id: 'p3', type: 'House',    price: 500000, bedrooms: 4, added: '2025-06-20', location: 'Bromley BR1' },
  { id: 'p4', type: 'Bungalow', price: 250000, bedrooms: 2, added: '2025-02-05', location: 'Sidcup DA14' },
];

test('no criteria returns every property', () => {
  expect(filterProperties(properties, {})).toHaveLength(4);
});

test('single criterion filters by type', () => {
  const result = filterProperties(properties, { type: 'House' });
  expect(result.map((p) => p.id)).toEqual(['p1', 'p3']);
});

test('multiple criteria combine correctly', () => {
  const result = filterProperties(properties, { type: 'House', maxPrice: '400000', minBedrooms: '3' });
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('p1');
});

test('filters by postcode area', () => {
  expect(filterProperties(properties, { postcode: 'BR' }).map((p) => p.id)).toEqual(['p1', 'p3']);
});

test('filters by a date range', () => {
  const result = filterProperties(properties, { addedFrom: '2025-02-01', addedTo: '2025-04-01' });
  expect(result.map((p) => p.id)).toEqual(['p2', 'p4']);
});
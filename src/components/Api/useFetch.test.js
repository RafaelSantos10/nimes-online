import { act, renderHook } from '@testing-library/react';
import useFetch from './useFetch';
import { API_ERROR, validId } from './config';

afterEach(() => { jest.restoreAllMocks(); delete global.fetch; });

test.each([
  ['DNS failure', () => Promise.reject(new TypeError('Failed to fetch'))],
  ['HTTP failure', () => Promise.resolve({ ok: false })],
  ['invalid payload', () => Promise.resolve({ ok: true, json: async () => ({ error: 'bad' }) })],
])('%s produces a visible error and stops loading', async (_, response) => {
  global.fetch = jest.fn(response);
  const { result } = renderHook(() => useFetch());
  await act(async () => { await result.current.request('/api'); });
  expect(result.current.error).toBe(API_ERROR);
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBeNull();
});

test('empty results are not network errors and a later request recovers', async () => {
  global.fetch = jest.fn().mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce({ ok: true, json: async () => [] })
    .mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1 }] });
  const { result } = renderHook(() => useFetch());
  await act(async () => { await result.current.request('/api'); });
  await act(async () => { await result.current.request('/api'); });
  expect(result.current.error).toBeNull();
  expect(result.current.data).toEqual([]);
  await act(async () => { await result.current.request('/api'); });
  expect(result.current.data).toEqual([{ id: 1 }]);
});

test('invalid stored identifiers are rejected', () => {
  [null, undefined, '', 'null', 'undefined', 0, 'abc'].forEach(id => expect(validId(id)).toBe(false));
  expect(validId('123')).toBe(true);
});

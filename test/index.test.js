import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import worker from '../src/index.js';

const env = {};
const ctx = { waitUntil: vi.fn(), passThroughOnException: vi.fn() };

function makeRequest(path = '/', init = {}) {
  return new Request(`http://localhost:8787${path}`, init);
}

describe('Hello World Worker', () => {
  // Silence the worker's log line so the test output stays clean.
  beforeEach(() => vi.spyOn(console, 'info').mockImplementation(() => {}));
  afterEach(() => vi.restoreAllMocks());

  it('responds with status 200', async () => {
    const response = await worker.fetch(makeRequest(), env, ctx);
    expect(response.status).toBe(200);
  });

  it('responds with "Hello World!"', async () => {
    const response = await worker.fetch(makeRequest(), env, ctx);
    expect(await response.text()).toBe('Hello World!');
  });

  it('returns a text/plain response', async () => {
    const response = await worker.fetch(makeRequest(), env, ctx);
    expect(response.headers.get('content-type')).toContain('text/plain');
  });

  it('logs the incoming request for observability', async () => {
    await worker.fetch(makeRequest(), env, ctx);
    expect(console.info).toHaveBeenCalledOnce();
    expect(console.info).toHaveBeenCalledWith({ message: 'Hello World Worker received a request!' });
  });

  it.each(['/', '/any/path', '/api?x=1'])('answers the same on path %s', async (path) => {
    const response = await worker.fetch(makeRequest(path), env, ctx);
    expect(await response.text()).toBe('Hello World!');
  });

  it.each(['GET', 'POST', 'PUT', 'DELETE'])('answers the same for method %s', async (method) => {
    const response = await worker.fetch(makeRequest('/', { method }), env, ctx);
    expect(response.status).toBe(200);
  });
});

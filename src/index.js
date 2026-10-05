/**
 * Hello World Worker.
 *
 * - npm run dev     -> local dev server at http://localhost:8787/
 * - npm test        -> unit tests
 * - npm run deploy  -> publish the worker
 */
export default {
  async fetch(request, env, ctx) {
    // You can view your logs in the Observability dashboard
    console.info({ message: 'Hello World Worker received a request!' });
    return new Response('Hello World!');
  }
};

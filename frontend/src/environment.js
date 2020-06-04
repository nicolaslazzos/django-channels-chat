export const BACKEND_HOST = 'http://127.0.0.1:8000';

export const WS_ENDPOINT = () => {
  const location = window.location;

  let protocol = 'ws://';

  if (location.protocol === 'https:') {
    protocol = 'wss://';
  }

  const endpoint = protocol + location.hostname + ':8000';

  return endpoint;
}
export const API_URL = process.env.NODE_ENV === 'production' ? `${window.location.origin}/hbc` : 'http://localhost:4000';
export const SOCKET_PATH = process.env.NODE_ENV === 'production' ? '/hbc/socket.io' : '/socket.io';

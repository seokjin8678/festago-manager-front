interface ApiSpec {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
}

export default ApiSpec;

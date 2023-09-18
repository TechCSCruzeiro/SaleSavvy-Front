export const jwtConfig = {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    }
  };
  
export const hasThrowErrorCookie = (): boolean => {
  const cookies = document.cookie.split(';');
  const throwErrorCookie = cookies.find(cookie => 
    cookie.trim().startsWith('throwError=')
  );
  
  return throwErrorCookie?.split('=')[1] === '1';
};

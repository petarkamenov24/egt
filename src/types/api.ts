export interface Todo {
    userId: number
    id: number
    title: string
    completed: boolean
  }
  
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}
export interface User {
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    username: string;
    bloodGroup: string;
    eyeColor: string;
  }

  export interface Product {
    id:number
    brand: string;
    title:string;
    category: string;
    description: string;
    discountPercentage: number;
    price: number;
    stock: number;
    rating: number;
  }
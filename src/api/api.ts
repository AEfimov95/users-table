import axios from 'axios';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface TableData {
  name?: string;
  gender?: Gender;
  email?: string;
  age?: number;
}

export const getRandomUsers = async (): Promise<TableData[]> => {
  const response:any[] = await axios.get('https://randomuser.me/api/?results=5').then((res)=>res.data.results).catch(()=>[])
  return response.map(({ name, gender, email, dob }) => {
    return { name: name.first, gender: gender, email: email, age: dob.age };
  });
};

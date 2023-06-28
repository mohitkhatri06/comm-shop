import bcrypt from 'bcryptjs';
const users = [
   {
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
   },
   {
      name: 'John',
      email: 'john@gmail.com',
      password: bcrypt.hashSync('123456', 10),
   },
   {
      name: 'Doe',
      email: 'doe@gmail.com',
      password: bcrypt.hashSync('123456', 10),
   },
];

export default users;

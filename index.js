// ------------------------ classwork 1 ------------------------
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
//
// rl.question('Як тебе звати? ', (answer) => {
//     console.log(`Привіт, ${answer}! Радий знайомству.`);
//
//     rl.close();
// });

// ------------------------ hw1 ------------------------

// const http = require('http')
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//         data: 'Hello World!'
//     }));
// });
//
// server.listen(3000, () => {
//     console.log('Сервер запущен на 3000 порту!');
// });

// ------------------------ classwork 2 ------------------------
// const path = require('node:path')
//
// const pathToFile = __filename
// console.log(pathToFile)
// console.log(path.dirname(pathToFile))
// console.log(path.extname(pathToFile))
// console.log(path.basename(pathToFile))
// console.log(path.parse(pathToFile))
// console.log(path.isAbsolute(pathToFile))
// console.log(path.isAbsolute('./lesson1/'))

// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();
// emitter.on('event2', () => {
//     console.log('Event happened')
// })
// emitter.emit('event2')
// emitter.emit('event2')
// emitter.emit('event2')
// emitter.emit('event2')
// emitter.emit('event2')
// emitter.emit('event2')
// emitter.once('event2', (...args) => {
//     console.log('________________');
//     console.log('Event 1 happened');
//     console.log(args)
//     console.log('________________');
// })
// emitter.on('event2', (...args) => {
//     console.log('Event 2 happened')
//     console.log(args)
// })
// emitter.emit('event2', 'Hello', 345, 44)
// emitter.emit('event2')
// emitter.emit('event2', 555)


// ------------------------ hw2 ------------------------
// Створити папку "baseFolder".
// В ній створити 5 папок
// В кожній з яких створити по 5 файлів з розширенням txt.
// Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.

// const fsPromises = require('fs/promises');
// const path = require('path');
//
// const createStructure = async () => {
//     try {
//         const baseFolderPath = path.join(__dirname, 'baseFolder')
//         await fsPromises.mkdir(baseFolderPath, { recursive: true });
//         console.log(`[Folder]: ${baseFolderPath}`)
//
//         for (let i = 1; i <= 5; i++) {
//             const folderName = `folder-${i}`
//             const folderPath = path.join(baseFolderPath, folderName)
//             await fsPromises.mkdir(folderPath, { recursive: true });
//             console.log(`[Folder]: ${folderPath}`);
//
//             for (let j = 1; j <= 5; j++) {
//                 const fileName = `file-${j}`
//                 const filePath = path.join(folderPath, fileName)
//                 const textForFile = `Hello! \n Folder Number: ${i}. \n File number: ${j}`
//                 await fsPromises.writeFile(filePath, textForFile)
//             }
//         }
//
//         console.log('\n--- Checking and displaying the contents of a structure ---\n');
//         await inspectDirectory(baseFolderPath)
//
//     } catch (e) {
//         console.log('Error while creating structure', e);
//     }
// }
//
// const inspectDirectory = async (currentPath) => {
//     const items = await fsPromises.readdir(currentPath, { withFileTypes: true });
//
//     for (const item of items) {
//         const fullPath = path.join(currentPath, item.name)
//
//         if (item.isDirectory()) {
//             console.log(`📁 Folder:  ${fullPath}`)
//             await inspectDirectory(fullPath)
//         } else if (item.isFile()) {
//             console.log(`      📄 File:   ${fullPath}`)
//         }
//     }
// }
//
// createStructure()

// ------------------------ classwork 3 ------------------------
// const express = require("express");
//
// const app = express();
//
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
//
// const users = [
//     {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
//     {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
//     {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
//     {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
//     {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
//     {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
//     {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
//     {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
//     {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
//     {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
// ];
//
// app.get('/users', (req, res) => {
//     try {
//         res.send(users);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.post('/users', (req, res) => {
//     try {
//         const {name, email, password} = req.body;
//         //TODO validate data
//         const id = users[users.length - 1].id + 1;
//         const newUser = {id, name, email, password};
//         users.push(newUser);
//         res.status(201).send(newUser);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.get('/users/:userId', (req, res) => {
//     try {
//         const userId = Number(req.params.userId);
//         const user = users.find(user => user.id === userId);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.put('/users/:userId', (req, res) => {
//     try {
//         const userId = Number(req.params.userId);
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).send('User not found');
//         }
//         const {name, email, password} = req.body;
//         //TODO validate data
//         // users[userIndex] = {...users[userIndex], name, email, password};
//         users[userIndex].name = name;
//         users[userIndex].email = email;
//         users[userIndex].password = password;
//         res.status(201).send(users[userIndex]);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.delete('/users/:userId', (req, res) => {
//     try {
//         const userId = Number(req.params.userId);
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).send('User not found');
//         }
//         users.splice(userIndex, 1);
//         res.sendStatus(204);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

// ------------------------ hw3 ------------------------

// Закінчити з CRUD операціями.
// При створенні робити валідацію на імʼя і вік,
// імʼя повинно бути більше за 3 символи, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є в базі.
// якщо немає – вивести помилку
// Використовуйте шляхи для нових ендпоінтів згідно REST правил

// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//
// const users = [
//     {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123', age: 22},
//     {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345', age: 20},
//     {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393', age: 25},
//     {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787', age: 19},
//     {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443', age: 22},
//     {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344', age: 24},
//     {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555', age: 21},
//     {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322', age: 30},
//     {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343', age: 18},
//     {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222', age: 23},
// ];
//
// // 1. GET: Отримати всіх користувачів
// app.get('/users', (req, res) => {
//     try {
//         res.status(200).send(users);
//     } catch (e) {
//         return res.status(500).send({error: e.message});
//     }
// });
//
// // 2. POST: Створити користувача з валідацією
// app.post('/users', (req, res) => {
//     try {
//         const {name, email, password, age} = req.body;
//
//         // Валідація: ім'я > 3 символів, вік >= 0
//         if (!name || name.length <= 3 || age < 0) {
//             return res.status(400).send({
//                 error: 'Validation error: Name must be longer than 3 characters and age cannot be less than 0'
//             });
//         }
//
//         const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
//         const newUser = {id, name, email, password, age};
//
//         users.push(newUser);
//         res.status(201).send(newUser);
//
//     } catch (e) {
//         res.status(500).send({error: e.message});
//     }
// });
//
// // 3. GET: Отримати конкретного користувача за ID
// app.get('/users/:userId', (req, res) => {
//     try {
//         const userId = +(req.params.userId); // Виправили id на userId
//         const user = users.find((user) => user.id === userId);
//
//         if (!user) {
//             return res.status(404).send({error: `No such user with id ${userId}`}); // Додано return!
//         }
//
//         res.status(200).send(user);
//     } catch(e) {
//         res.status(500).send({error: e.message});
//     }
// });
//
// // 4. PUT: Оновити користувача (з перевіркою чи існує)
// app.put('/users/:userId', (req, res) => {
//     try {
//         const userId = +(req.params.userId); // Виправили id на userId
//         const userIndex = users.findIndex(user => user.id === userId);
//
//         if (userIndex === -1) {
//             return res.status(404).send({error: `User with id ${userId} not found`});
//         }
//
//         const {name, email, password, age} = req.body;
//
//         // Оновлюємо дані
//         users[userIndex] = {
//             ...users[userIndex],
//             ...(name && { name }),
//             ...(email && { email }),
//             ...(password && { password }),
//             ...(age !== undefined && { age })
//         };
//
//         res.status(200).send(users[userIndex]);
//     } catch(e) {
//         res.status(500).send({error: e.message});
//     }
// });
//
// // 5. DELETE: Видалити користувача (з перевіркою чи існує)
// app.delete('/users/:userId', (req, res) => {
//     try {
//         const userId = +(req.params.userId); // Виправили регістр і назву параметра
//         const userIndex = users.findIndex(user => user.id === userId);
//
//         if (userIndex === -1) {
//             return res.status(404).send({error: `User with id ${userId} not found`});
//         }
//
//         users.splice(userIndex, 1);
//         res.sendStatus(204); // Успішно видалено, без тіла відповіді
//     } catch(e) {
//         res.status(500).send({error: e.message});
//     }
// });
//
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

// ------------------------ classwork 4 ------------------------

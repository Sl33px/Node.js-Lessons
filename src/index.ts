import express, { Request, Response } from "express";

import { read, write } from "./services/fs.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. GET: Отримати всіх користувачів
app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await read();
        res.send(users);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
});

// 2. POST: Створити користувача з валідацією
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { name, email, password, age } = req.body;

        // Валідація: ім'я > 3 символів, вік >= 0
        if (!name || name.length <= 3 || age < 0) {
            return res.status(400).send({
                error: "Validation error: Name must be longer than 3 characters and age cannot be less than 0",
            });
        }

        const users = await read();

        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = { id, name, email, password, age };
        users.push(newUser);
        
        await write(users);
        res.status(201).send(newUser);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// 3. GET: Отримати конкретного користувача за ID
app.get("/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = +req.params.userId; // Виправили id на userId
        const users = await read();
        const user = users.find((user) => user.id === userId);

        if (!user) {
            return res
                .status(404)
                .send({ error: `No such user with id ${userId}` }); // Додано return!
        }

        await write(users);
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// 4. PUT: Оновити користувача (з перевіркою чи існує)
app.put("/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = +req.params.userId; // Виправили id на userId
        const users = await read();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            return res
                .status(404)
                .send({ error: `User with id ${userId} not found` });
        }

        const { name, email, password, age } = req.body;

        // Оновлюємо дані
        users[userIndex] = {
            ...users[userIndex],
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password }),
            ...(age !== undefined && { age }),
        };

        await write(users);
        res.status(200).send(users[userIndex]);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// 5. DELETE: Видалити користувача (з перевіркою чи існує)
app.delete("/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = +req.params.userId; // Виправили регістр і назву параметра
        const users = await read();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            return res
                .status(404)
                .send({ error: `User with id ${userId} not found` });
        }

        users.splice(userIndex, 1);
        await write(users);
        res.sendStatus(204); // Успішно видалено, без тіла відповіді
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

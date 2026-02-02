const bcrypt = require("bcrypt");
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//  Register
app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1️⃣ Проверка ДО всего
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    // 2️⃣ Хешируем пароль
    const hash = await bcrypt.hash(password, 10);

    // 3️⃣ SQL-запрос
    db.query(
      "INSERT INTO user (email, name, hash) VALUES (?, ?, ?)",
      [email, name, hash],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Ошибка БД" });
        }

        // 4️⃣ Ответ клиенту
        res.status(201).json({ message: "Регистрация успешна" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
module.exports = {router};
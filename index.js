const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const bcrypt = require("bcrypt");


const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const db = mysql.createConnection({
  host: "MySQL-8.0",
  user: "root",
  password: "",
  database: "myfirstbd"
});

// 3️⃣ Статические файлы (CSS, JS, картинки)
app.use(express.static(path.join(__dirname, "public")));
// 4️⃣ HTML страница
app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "views", "warsaw.html"));});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/me", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "me.html"));
});





// REGISTER
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
      "INSERT INTO user (email, name, password) VALUES (?, ?, ?)",
      [email, name, hash],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Ошибка БД" });
        }
        
        // 4️⃣ Ответ клиенту
        // res.status(201).json({ message: "Регистрация успешна"});
        res.redirect("/login");
       
        
      }
      
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
 
});



// ЛОГИН
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // 1. если не прислали данные
  if (!email || !password) {
    return res.send("Нет email или пароля");
  }

  // 2. ищем пользователя
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err); 
        return res.send("Ошибка базы");
      }

      // 3. если нет такого пользователя
      if (result.length === 0) {
        return res.send("Пользователь не найден");
      }

      const user = result[0];

      // 4. сравниваем пароль
      const ok = bcrypt.compareSync(password, user.password);

      if (!ok) {
        return res.send("Неверный пароль");
      }

      // 5. успех
      res.redirect("/me")
      
    }
  );
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})


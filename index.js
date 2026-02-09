const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'my-super-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }
  })
);

/* ================== DATABASE ================== */
const db = mysql.createConnection({
  host: 'MySQL-8.0',
  user: 'root',
  password: '',
  database: 'myfirstbd'
});

db.connect(err => {
  if (err) {
    console.error('DB ERROR:', err);
  } else {
    console.log('MySQL connected');
  }
});

/* ================== STATIC FILES ================== */
app.use(express.static(path.join(__dirname, 'public')));

/* ================== PAGES ================== */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'warsaw.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

/* ================== API ================== */

/* 🔌 КТО Я */
app.get('/api/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).end();
  }

  db.query(
    'SELECT id, email, name FROM `user` WHERE id = ?',
    [req.session.userId],
    (err, rows) => {
      if (err) return res.status(500).end();
      if (rows.length === 0) return res.status(401).end();

      res.json(rows[0]);
    }
  );
});

/* 🔌 DASHBOARD DATA */
app.get('/api/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).end();
  }

  db.query(
    'SELECT email, name FROM `user` WHERE id = ?',
    [req.session.userId],
    (err, rows) => {
      if (err) return res.status(500).end();
      res.json(rows);
    }
  );
});

/* ================== AUTH ================== */

/* REGISTER */
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.send('Заполните все поля');
  }

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO `user` (email, name, password) VALUES (?, ?, ?)',
    [email, name, hash],
    err => {
      if (err) return res.send('Ошибка БД');
      res.redirect('/login');
    }
  );
});

/* LOGIN */
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send('Нет email или пароля');
  }

  db.query(
    'SELECT * FROM `user` WHERE email = ?',
    [email],
    (err, rows) => {
      if (err) return res.send('Ошибка БД');
      if (rows.length === 0) return res.send('Пользователь не найден');

      const user = rows[0];
      const ok = bcrypt.compareSync(password, user.password);
      if (!ok) return res.send('Неверный пароль');

      /* 🔑 ВАЖНО: сохраняем ТОЛЬКО ID */
      req.session.userId = user.id;

      res.redirect('/');
    }
  );
});

/* LOGOUT */
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

/* ================== SERVER ================== */
app.listen(3000, () => {
  console.log('Server running: http://localhost:3000');
});
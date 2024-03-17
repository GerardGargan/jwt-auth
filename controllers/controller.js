const db = require("./../util/dbconn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  let { name, email, password } = req.body;

  console.log(name, email, password);
  const hashed = await hashPassword(password, 10);
  const vals = [name, email, hashed];

  const query = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
  try {
    const [data, fielddata] = await db.query(query, vals);
  } catch (err) {
    console.log(`Error in catch ${err}`);
  }

  console.log(hashed);

  res.redirect("/login");
};

exports.getLogin = (req, res) => {
  // console.log(req.cookies.jwtAuth);
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM user WHERE email = ?`;
  const [data, fielddata] = await db.query(query, [email]);

  if (data.length > 0) {
    //user exists, get their password to compare
    const hashedPassword = data[0].password.toString();
    const comparePass = await comparePassword(password, hashedPassword);

    if (comparePass) {
      console.log(`Password match`);
      const user = { id: data[0].id, name: data[0].name };

      //set up jwt token
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      //store in a cookie
      res.cookie("token", accessToken, { httpOnly: true });
      res.redirect('/protected');
    } else {
      console.log(`Password doesn't match`);
      res.redirect("/login");
    }
  } else {
    console.log("user does not exist");
    res.redirect("/login");
  }
};

exports.getHome = (req, res) => {
  res.send("hello world");
};

exports.getProtected = (req, res) => {
  console.log(req.user);
  res.render('protected', { user: req.user });
};

exports.getLogout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
}

async function hashPassword(plaintext, rounds) {
  try {
    const hashed = bcrypt.hash(plaintext, rounds);
    return hashed;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.log(err);
  }
}

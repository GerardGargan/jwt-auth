const db = require('./../util/dbconn');
const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
    res.render('register');
}

exports.postRegister = async (req, res) => {
    let { name, email, password } = req.body;

    console.log(name, email,password);
    const hashed = await hashPassword(password, 10);
    const vals = [name, email, hashed];

    const query = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
    try {
        const [data, fielddata] = await db.query(query,vals);
    } catch (err) {
        console.log(`Error in catch ${err}`);
    }

    console.log(hashed);

    res.redirect('/login');
}

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM user WHERE email = ?`;
    const [data, fielddata] = await db.query(query, [email]);

    if(data.length > 0) {
        //user exists, get their password to compare
        const hashedPassword = data[0].password.toString();
        console.log(password);
        console.log(hashedPassword);
        const comparePass = await comparePassword(password, hashedPassword);
        console.log(comparePass);
        if(comparePass) {
            console.log(`Password match`);
        } else {
            console.log(`Password doesnt match`);
        }

    } else {
        console.log('user does not exist');
        res.redirect('/login');
    }
}

exports.getHome = (req, res) => {
    res.send('hello world');
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
    } catch (err){
        console.log(err);
    }
}
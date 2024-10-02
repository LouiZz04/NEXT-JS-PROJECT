import express from 'express';
import jwt from 'jsonwebtoken';
import db from './models';
import dotenv from 'dotenv';
import transporter from './nodemailer/index';

dotenv.config();

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await db.User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
        await transporter.sendMail({
            from: 'test@demomailtrap.com',
            to: email,
            subject: "Welcome",
            text: `Hello ${username}, Welcome to our Website...`,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User creation failed' });
    }
});

app.post('/changepass', async (req, res) => {
    const {username, password, newpassword} = req.body;

    try{
        const user = await db.User.findOne({ where: { username } });
        if(user.password !== password){
            return res.status(401).json({ message: 'Wrong password' });
        }

        user.password = newpassword;
        await user.save();
        const token = jwt.sign({ id: user.id, password: user.password }, process.env.SECRET_PASS || 'something else...');

        res.status(200).json({ message: 'Password changed successfully', token });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
})

app.post('/logout', (_req, res) => {
    res.json({message: "successfully logged out!"});
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, password: user.password }, process.env.SECRET_PASS || 'something else...');

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/addlike', async (req, res) => {
    const { username, url } = req.body;

    try {
        const user = await db.User.findOne({ where: { username } });

        if (user.likes.includes(url)) {
            return res.status(400).json({ message: 'URL already liked' });
        }
        user.likes = [...user.likes, url];
        await user.save();

        res.status(200).json({ message: 'URL added to likes', likes: user.likes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add like' });
    }
});

app.get('/user/likes/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await db.User.findOne({ where: { username } });

        res.status(200).json({ likes: user.likes });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Failed to fetch likes' });
    }
});





const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any) => {
        if (err) return res.sendStatus(403);
        next();
    });
};

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('App listening on port 3001');
    });
});

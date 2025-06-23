const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                username: true
            } // get only username
        });
        res.json(users);
    } catch (error) {
        res.json({
            message: 'cannot get users',
            error: error.error
        })
    }
}

exports.postUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const existingUser = await prisma.users.findUnique({
            where: {username}
        });

        if (existingUser) {
            res.status(400).json({
                message: 'ชื่อผู้ใช้นี้ลงทะเบียนแล้ว กรุณากรอกชื่อผู้ใช้ใหม่'
            })
        }

        const saltRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma
            .users.create({
            data: {
                username: username,
                password: hashPassword
            }
        })

        res.status(201).json({
            message: 'create user sucessfully',
            user: {
                id: newUser.id,
                username: newUser.username
            }
        });

    } catch (err) {
        console.error('Query error:', err.message);
        res.status(500).send('Database error');
    }
}
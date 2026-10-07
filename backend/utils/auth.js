import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const JWT_SECRET_CLIENT = process.env.JWT_SECRET_CLIENT;
export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

export const hashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (payload, secret) => {
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}
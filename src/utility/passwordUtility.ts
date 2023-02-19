import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async ( password: string, salt: string ) => {
    return await bcrypt.hash( password, salt);
}
//to validate the password
export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = (payload: any) => {
    return jwt.sign(payload, 'APP_SECRET_KEY', {expiresIn: '1d'});
}
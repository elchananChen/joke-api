import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
async function signIn(password, mongoPassword){
const combinedPassword = password+process.env.ENCYPTION_SECRET
console.log(combinedPassword);


    }
signIn(1344, 43231)
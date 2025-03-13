import { reject } from "bcrypt/promises"
import db from "../models/index"
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) =>{
        try {
        let hashPassword = await bcrypt.hashSync(password, salt);
        resolve(hashPassword); 
    } catch (error) {
            reject(error);
        }
    })
}

let handleUserLogin = (email, password) => {
 return new Promise(async(resolve, reject) =>{
   try {
      let userData = {};

      let isExit = await checkUserEmail(email);
      if(isExit){
         //user already exits

         let user = await db.User.findOne({
            where: {email: email},
            raw: true
         })
         if(user){
         //compaire password(so sánh pass)
         let check = await bcrypt.compareSync(password, user.password); // false
            if(check){
               userData.errCode = 0,
               userData.errMessage = "Ok",
               console.log(user);
               //xóa trường password
               delete user.password;
               userData.user = user;
            }else{
               userData.errCode = 3;
               userData.errMessage = "Wrong password"
         }
         }else{
            userData.errCode = 2,
            userData.errMessage = "User not found"
            resolve(userData)
         }
      }else{
         //return error
         userData.errCode = 1,
         userData.errMessage = "Your`s user email isn`t exit in your system. Plz try other email"
      }
      resolve(userData)

   } catch (error) {
      reject(error)
   }
 })
}

let checkUserEmail =(userEmail) =>{
   return new Promise(async(resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: {
               email: userEmail
            }
         })
         if(user){
            resolve(true)
         }else{
            resolve(false)
         }
      } catch (error) {
         reject(error);
      }
   })
}

let getAllUsers = (userId) => {
   return new Promise(async(resolve, reject) =>{
      try {
         let users = '';
         if(userId === "ALL"){
            users = await db.User.findAll({
               exclude: ['password ']
            })
         }
         if (userId && userId !== 'ALL'){
            users = await db.User.findOne({
               where: {id: userId},
               exclude: ['password']
            })
         }
         resolve(users)
      } catch (e) {
         reject(e);
      }
   })
}

let createNewUser =(data) =>{
   return new Promise(async(resolve, reject) =>{
      try {
      //check email is exits
      let check = await checkUserEmail(data.email);
      if(check === true){
         resolve({
            errCode: 1,
            message: 'Your email is already in used, Plz try another email'
         })
      }
      let hashPasswordFromBcrypet = await hashUserPassword(data.password);
         await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypet,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender=='1'? true : false,
            roleId: data.roleId,
         })
         resolve({
            errCode: 0,
            message: 'Ok'
         });
      } catch (e) {
         reject(e);
      }
   })
}
let deleteUser =(userId) => {
   return new Promise (async(resolve, reject) => {
      let user = await db.User.findOne({
         where: {id: userId}
      })
      if(!user){
         resolve({
            errCode: 2,
            errMessage: 'The user isn`t exits'
         })
      }
      // if(user){
      //    await user.destroy();
      // }
      await db.User.destroy({
         where: {id: userId}
      })
      resolve({
         errCode: 0,
         errMessage: 'The user is deleted'
      })
   })
}

let updateUserData = (data) =>{
   return new Promise (async(resolve, reject) => {
      try {
         if(!data.id){
            resolve({
            errCode: 2,
            errMessage: 'Missing requier paramater'
         })
         }
         let user = await db.User.findOne({
            where:{id: data.id},
            raw: false
         })
         if(user){
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
         // await db.User.save({
         //    firstName: data.firstName,
         //    lastName: data.lastName,
         //    address: data.address
         // },{where: {id: userId}})
         
            resolve({
               errCode: 0,
               errMessage: 'Update the user succed'
         });
         }else{
         resolve({
            errCode: 1,
            errMessage: 'User not found!'
         });
         }
      } catch (e) {
         reject(e);
      }
   
   })
}
module.exports ={
   handleUserLogin:handleUserLogin,
   checkUserEmail:checkUserEmail,
   getAllUsers: getAllUsers,
   createNewUser:createNewUser,
   deleteUser:deleteUser,
   updateUserData:updateUserData
} 
import bcrypt from "bcryptjs"
import db from '../models/index'
import { raw } from "body-parser";
import e, { request } from "express";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data) =>{
    return new Promise(async(resolve, reject) => {
        try {
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
            resolve('ok create a new user succed');//resolve bang cau lenh return
        } catch (e) {
            reject(e);
        }
    })

}
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
let getAllUser = () => {
    return new Promise((resolve,reject)=>{
        try {
            let user = db.User.findAll({
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}
let getUserInfoById = (userId) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId},
                raw: true,
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); 

                let allUsers = db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
        } catch (error) {
            console.log(error);
        }
    })
}
let deleteCrudById = (id) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id : id}
            })
            if(user){
                await user.destroy();
            }
            resolve(); //bang rertun
        } catch (error) {
            reject(error);
        }
    })
}
module.exports ={
    createNewUser:createNewUser,
    hashUserPassword:hashUserPassword,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteCrudById:deleteCrudById
}
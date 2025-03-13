import { json } from 'body-parser';
import db from '../models/index'
import CRUDService from '../services/CRUDservices'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}
let getAuboutPage = (req, res) => {
    return res.render("test/about.ejs");
}
// Object: {
//     key: "";
//     value: "";    
// }
let getCrud = (req, res) => {
    return res.render("Crud.ejs");
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    //req.body de lay cac tham so tu clinet leen sever cua chung ta
    console.log(message);
    return res.send("Post CRuD in server");

}

let displayGetCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log("----------");
    // console.log(data);
    // console.log("----------");
    return res.render('displayCrud.ejs', {
        dataTable: data
    });
}

let getEditCrud = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check userData not found
        // x <= y
        return res.render("editCrud.ejs", {
            user: userData
        });

    }
    else {
        return res.send("Users not found");
    }
}
let putCrud = async (req, res) => {
    let data = req.body; //lay du lieu tu clinet
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCrud.ejs', {
        dataTable: allUsers
    });
}
let deleteCrud = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteCrudById(id);
        return res.send("delete user succed");
    }
    else {
        return res.send("user not found");
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAuboutPage: getAuboutPage,
    getCrud: getCrud,
    postCRUD: postCRUD,
    displayGetCrud: displayGetCrud,
    getEditCrud: getEditCrud,
    putCrud: putCrud,
    deleteCrud: deleteCrud}
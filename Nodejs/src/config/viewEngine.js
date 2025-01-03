import express from "express";

let congifViewEngine = (app) => {
    //arroww function
    app.use(express.static("./src/public"));
    app.set("view engine","ejs" );//ejs giống jsp
    app.set("views", "./src/views");

}

module.exports = congifViewEngine;
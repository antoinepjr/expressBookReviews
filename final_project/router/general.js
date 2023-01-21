const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;

    for(i = 0; i < users.length; i++){
        if (users[i].username === username) {
            res.send("Username already exists!");
        }
    }

    if (!username || !password){
        res.send("Username or Password does not exist.");
    }

    users.push({"username":req.query.username, "password":req.query.password});
    res.send("The user" + (' ') + (req.query.username) + " has been added!")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res.send(JSON.stringify(books)));    
        },2000)})
    
    myPromise.then((successMessage) => {
        res.send(successMessage);    
    })    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            for(i = 1; i < 11, i++;) {
                if (books[i].isbn === isbn) {
                    resolve(res.send(books[i]));
                }
            }  
        }, 3000)})

    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            for(i = 1; i < 11, i++;) {
                if (books[i].author === author) {
                    resolve(res.send(books[i]));
                }
            }  
        }, 3000)})

    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            for(i = 1; i < 11, i++;) {
                if (books[i].title === title) {
                    resolve(res.send(books[i]));
                }
            }  
        }, 3000)})

    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            for(i = 1; i < 11, i++;) {
                if (books[i].isbn === isbn) {
                    resolve(res.send(books[i].reviews));
                }
            }  
        }, 3000)})

    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

module.exports.general = public_users;

const {db, } = require('../pgp');

class User {
    constructor (db) {
        this.db = db;
    }

    checkUser (username) {
        return this.db.any("SELECT * FROM ws_users WHERE username = $1", username);
    }

    insertUser (username, password) {
        return this.db.none("INSERT INTO ws_users(username, password) VALUES($1, $2)", [username, password]);
    }

    checkLogin (username, password) {
        return this.db.one("SELECT * FROM ws_users WHERE username = $1 AND password = $2", [username, password]);
    }
};

module.exports = new User(db);

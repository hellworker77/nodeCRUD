const sqlite3 = require('sqlite3').verbose()

const context = new sqlite3.Database('course.db')

const createTableRequest = 'CREATE TABLE IF NOT EXISTS Users (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Age INTEGER NOT NULL)'
const getAllUsersRequest = 'SELECT * FROM Users'
const getUserByIdRequest = 'SELECT * FROM Users WHERE Id = ?'
const addUserRequest = 'INSERT INTO Users (Name, Age) VALUES(?,?)'
const updateUserRequest = 'UPDATE Users SET Name=?, Age=? WHERE Id=?'
const deleteUserByIdRequest = 'DELETE FROM Users WHERE Id = ?'

context.run(createTableRequest)

module.exports = {
    async getUsers() {
        return await new Promise((resolve, reject) => {
            context.all(getAllUsersRequest, [], (error, rows) => {
                error ? reject(error) : resolve(rows)
            })
        })
    },
    async getUserById(id) {
        return await new Promise((resolve, reject) => {
            context.get(getUserByIdRequest, [id], (error, row) => {
                error ? reject(error) : resolve(row)
            })
        })
    },
    async createUser(user) {
        const userId = await new Promise((resolve, reject) => {
            context.run(addUserRequest, [user.name, user.age], function(error) {
                error ? reject(error) : resolve(this.lastID)
            })
        })
        return {id: userId, ...user}
    },
    async updateUser(id, updatedUser){
        const changesCount = await new Promise((resolve, reject) => {
            context.run(updateUserRequest, [updatedUser.name, updatedUser.age, id], function(error)  {
                error ? reject(error) : resolve(this.changes)
            })
        })
        console.log(changesCount)
        return changesCount > 0 ? this.getUserById(id) : null
    },
    async deleteUserById(id){
        const changesCount = await new Promise((resolve, reject) => {
            context.run(deleteUserByIdRequest, [id], function(error)  {
                error ? reject(error) : resolve(this.changes)
            })
        })

        return changesCount > 0
    }
}
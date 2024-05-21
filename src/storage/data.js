const users = []
let currentId = 1

module.exports = {
    exists: (id) => users.findIndex(x=>x.id === id) !== -1,
    getUsers: () => users,
    getUserById: (id) => users.find(x=>x.id === id),
    addUser: (user) => {
        user.id = currentId++
        users.push(user)
    },
    updateUser: (id, updatedUser) => {
        const userIndex = users.findIndex(x=>x.id === id)
        if(userIndex === -1)
        {
            return null
        }
        users[userIndex] = {...users[userIndex], ...updatedUser}
        return users[userIndex]
    },
    deleteUser: (id) => {
        const userIndex = users.findIndex(x=>x.id === id)
        if(userIndex === -1)
        {
            return false
        }
        users.splice(userIndex, 1)
        return true
    }
}
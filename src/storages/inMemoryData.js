const users = []
let currentId = 1

module.exports = {
    getUsers: () => users,
    getUserById: (id) => new Promise(resolve => users.find(x=>x.id === id)),
    addUser: (user) => {
        user.id = currentId++
        users.push(user)
        return user
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
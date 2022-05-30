const userDal = require('../repository/userDAL');


const updateNumofTransactions = async (username) => {
    const users = await userDal.getUsers();
    const usersData = users.users;
    let newUsersData = usersData;

    objIndex = usersData.findIndex( x => x.Username == username);

    if(objIndex > -1){//Update this user        
        newUsersData[objIndex].NumofTransactions++;
        const result = await userDal.updateOrAddUser(newUsersData);
        return result;
    }        
}

const updateCreatedDateAndZeroCounter = async (username, date) => {
    const users = await userDal.getUsers();
    const usersData = users.users;
    let newUsersData = usersData;

    objIndex = usersData.findIndex( x => x.Username == username);

    if(objIndex > -1){//Update this user        
        newUsersData[objIndex].CreatedDate = date;
        newUsersData[objIndex].NumofTransactions = 0;
        const result = await userDal.updateOrAddUser(newUsersData);
        return result;
    }        
}


const getCreatedDate = async (username) => {
    const users = await userDal.getUsers();
    const usersData = users.users;
    let newUsersData = usersData;

    objIndex = usersData.findIndex( x => x.Username == username);

    if(objIndex > -1){//Update this user        
        return newUsersData[objIndex].CreatedDate;
    }        
}


const getUserNumofTransactions = async (username) => {
    const users = await userDal.getUsers();
    const usersData = users.users;
    const user = usersData.filter(user => user.Username == username);    
    return user[0].NumofTransactions;
}



const checkCredentials = async (obj) => {

    const username = obj.name;
    const password = obj.pass;

    //Getting users Cred from file (DAL)
    const userCredentials = await userDal.getUsers();
    const usersObj = userCredentials.users;

    const result = usersObj.find(x=> x.Username == username && x.Password == password);

    if(result){
        return result;
    }
    
}


const getUserByName = async (username) => {
    const users = await userDal.getUsers();
    const usersData = users.users;

    const user = usersData.filter(user => user.Username == username);

    return user;
}



const getAllUsers = async () => {
    const users = await userDal.getUsers();
    const userData = users.users;

    return userData;
}



const deleteUserByName = async (username) => {

    const users = await userDal.deleteUserByName(username);
    const userData = users.users;

    return userData;

}


const updateOrCreateUser = async (obj) => {

    //Getting the users
    const users = await userDal.getUsers();
    const usersData = users.users;
    let newUsersData = usersData;

    objIndex = usersData.findIndex( x => x.Username == obj.Username);
    
    if(objIndex > -1){//Update this user        
        newUsersData[objIndex] = obj;
    }
    else{//Create new user
        newUsersData.push(obj);
    }

    const result = await userDal.updateOrAddUser(newUsersData);
    
    return result;
}


module.exports = {checkCredentials, getAllUsers, deleteUserByName, getUserByName, updateOrCreateUser, updateNumofTransactions, getUserNumofTransactions, updateCreatedDateAndZeroCounter, getCreatedDate}
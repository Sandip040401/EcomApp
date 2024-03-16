
export default class UserModel{
    constructor(id, name, email, password, type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static SignUp(name, email, password, type){
        const newUser = new UserModel(users.length + 1, name, email, password,type);
        users.push(newUser);
        return newUser;
    }

    static SignIn(email, password){
        const user = users.find(u => u.email==email && u.password == password);
        return user;
    }
}

var users = [
    {
        id:1,
        name:"Seller",
        email:"seller@gamil.com",
        password:"password",
        type:"seller"
    },
];
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:LUu93YnSu2GH4WkV@casino.0ojnj.gcp.mongodb.net/casino?authSource=admin&replicaSet=atlas-whsl7l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', { 
    name: {
        type: String,
        unique: true,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    discord: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        required: true,
        default: 0
    }
});
async function getUserById (name) {
    return await User.findOne({ discord: `<@!${name}>` }).exec().catch(err => {
        if (err instanceof TypeError) return undefined;
    });
}
async function getUserByQuery(query) {
    return await User.findOne(query).exec().catch(err => {
        if (err instanceof TypeError) return undefined;
    });
}
module.exports.getMoney = async (name) => {
    let user = await getUserById(name);
    console.log(user);
    if (user == undefined) return undefined;
    return user.value;
}
module.exports.removeMoney = async (name,summ) => {
    let user = await getUserById(name);
    if (user == undefined) return undefined;
    return await User.findOneAndUpdate({ discord: '<@!' + name +  '>'}, { value: Number.parseInt(user.value) - Number.parseInt(summ) }).exec().catch(err => {
        if (err instanceof TypeError) {
            return undefined;
        }
    }).then(async () => {
        user = getUserById(name);
        return await Number.parseInt(user.value);
    });    
}
module.exports.addMoney = async (name,summ) => {
    let user = await getUserById(name);
    if (user == undefined) return undefined;
    return await User.findOneAndUpdate({ discord: '<@!' + name +  '>'}, { value: Number.parseInt(user.value) + Number.parseInt(summ) }).exec().catch(err => {
        if (err instanceof TypeError) {
            return undefined;
        }
    }).then(async () => {
        user = getUserById(name);
        return await Number.parseInt(user.value);
    });    
}
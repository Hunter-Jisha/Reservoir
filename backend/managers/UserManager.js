const sqlite = require("sqlite3")
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

var db, sequelizer, users

const hashRounds = 5
const sessionExpMs = 600000 //= 10 minutes

async function init()
{
    db = new sqlite.Database("./databases/users.sqlite")
    sequelizer = new Sequelize("sqlite:./databases/users.sqlite", {
        logging: false
    })
    await sequelizer.authenticate();
    users = sequelizer.define("user",
    {
        email: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        password:  Sequelize.STRING,
        sessoinId: Sequelize.STRING,
        sessionExp: Sequelize.BIGINT
    })

    sequelizer.sync()

    console.log("Device Database Initialized...")
}

function register(email, password)
{
    return users.create(
        {
            email: email.toLowerCase(),
            password: bcrypt.hashSync(password, hashRounds)
        }
    ).then(
        () => {
            return {
                success: true,
                message: "Account creation successful"
            }
        }
    ).catch(error => {
        return {
            success: false,
            message: error.message
        }
    })
}

async function login(email, password)
{
    const user = await users.findOne({
        where: {email: email.toLowerCase()}
    })
    
    if(user !== null)
    {
        if(bcrypt.compareSync(password, user.dataValues.password))
        {
            const sessionId = crypto.randomBytes(16).toString("base64")
            user.sessionId = sessionId
            user.sessionExp = Date.now() + sessionExpMs
            await user.save()

            return {
                success: true,
                sessionId: sessionId
            }
        }
    }  

    return {
        success: false
    }
}

const typeDefs = `
    type Query {
        register(email: String!, password: String!): RegisterStatus
        login(email: String!, password: String!): LoginStatus
    }

    type RegisterStatus {
        success: Boolean
        message: String
    }

    type LoginStatus {
        success: Boolean,
        sessionId: String
    }
`

const resolvers = {
    Query: {
        register(obj, args, context, info) {
            return register(args.email, args.password)
        },
        login(obj, args, context, info) {
            return login(args.email, args.password)
        }
    }
}

module.exports = {init, typeDefs, resolvers}
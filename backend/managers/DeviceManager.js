var sqlite = require("sqlite3")
const Sequelize = require("sequelize");

var db, sequelizer, devices

async function init()
{
    db = new sqlite.Database("./databases/devices.sqlite")
    sequelizer = new Sequelize("sqlite:./databases/devices.sqlite")
    await sequelizer.authenticate();
    devices = sequelizer.define("device",
    {
        id: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    })

    console.log("Device Database Initialized...")
}

const typeDefs = `
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => {
            return "world"
        }
    }
}

module.exports = {init, typeDefs, resolvers}
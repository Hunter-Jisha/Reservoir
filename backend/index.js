const DeviceManager = require("./managers/DeviceManager")
const UserManager = require("./managers/UserManager")
const GQLServer = require("./GQLServer")


async function main() 
{
    await DeviceManager.init()
    await UserManager.init()
    GQLServer.init([DeviceManager.typeDefs, UserManager.typeDefs], [DeviceManager.resolvers, UserManager.resolvers])
    GQLServer.start()
}

main()
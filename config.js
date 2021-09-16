module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://admin:OvVdXZsiO7HhDOZ0@cluster0-shard-00-00.yldar.mongodb.net:27017,cluster0-shard-00-01.yldar.mongodb.net:27017,cluster0-shard-00-02.yldar.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-e20uqm-shard-0&authSource=admin&retryWrites=true&w=majority',
    PORT: process.env.PORT || 3000
}
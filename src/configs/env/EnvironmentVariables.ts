export default () => ({
    port: parseInt(process.env.PORT!, 10) || 3000,
    domain: process.env.DOMAIN || 'localhost',
    auth: {
        JWT_secret: process.env.JWT_SECRET || 'test',
    },
    database: {
        mongo: {
            host: process.env.MONGO_HOST || 'localhost',
            login: process.env.MONGO_LOGIN || 'admin',
            password: process.env.MONGO_PASSWORD || 'admin',
            port: parseInt(process.env.MONGO_PORT!, 10) || 27017,
            authDataBase: process.env.MONGO_AUTHDATABASE || 'localhost',
        },
        postgreSQL: {
            host: process.env.POSTGRE_HOST || 'localhost',
            login: process.env.POSTGRE_USER || 'admin',
            password: process.env.POSTGRE_PASSWORD || 'admin',
            port: parseInt(process.env.POSTGRE_PORT!, 10) || 5444,
            authDataBase: process.env.POSTGRE_DB || 'default',
        },
    },
})
const rootPath = __dirname;

module.exports = {
    rootPath,
    mongo: {
        db: 'mongodb://localhost/tasks',
        options: {useNewUrlParser: true},
    }
};
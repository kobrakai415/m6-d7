import s from "sequelize";
import pg from "pg";
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import AuthorModel from "../../services/authors/sequelize.js"
import BlogModel from "../../services/blogs/sequelize.js"

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env

const sequel = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres"
})

const test = async () => {
    try {
        await sequel.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test()

const models = {
    Author: AuthorModel(sequel, DataTypes),
    Blog: BlogModel(sequel, DataTypes),
    sequel: sequel,
}

models.Author.hasMany(models.Blog);
models.Blog.belongsTo(models.Author);

export default models;
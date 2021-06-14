import s from "sequelize";
import pg from "pg";
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import AuthorModel from "./authors.js"
import BlogModel from "./blogs.js"
import CommentModel from "./comments.js"
import CategoryModel from "./category.js"
import BlogCategoryModel from "./blogCategory.js"

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
    Comment: CommentModel(sequel, DataTypes),
    Category: CategoryModel(sequel, DataTypes),
    BlogCategory: BlogCategoryModel(sequel, DataTypes),
    sequel: sequel,
}

models.Author.hasMany(models.Blog, {onDelete:"CASCADE"});
models.Blog.belongsTo(models.Author, {onDelete:"CASCADE"});

models.Author.hasMany(models.Comment, {onDelete:"CASCADE"});
models.Comment.belongsTo(models.Author, {onDelete: "CASCADE"})

models.Blog.hasMany(models.Comment, {onDelete:"CASCADE"});
models.Comment.belongsTo(models.Blog, {onDelete:"CASCADE"});

models.Blog.belongsToMany(models.Category, {through: {model: models.BlogCategory, unique: false, timestamps: false }})
models.Category.belongsToMany(models.Blog, {through: {model: models.BlogCategory, unique: false, timestamps: false }})

export default models; 
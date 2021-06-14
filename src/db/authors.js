

export default (sequelize, DataTypes) => {

    const author = sequelize.define("author", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        surname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    })
    return author
}   
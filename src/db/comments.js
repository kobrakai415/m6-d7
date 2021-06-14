export default (sequelize, DataTypes) => {

    const comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    })
    return comment
}   
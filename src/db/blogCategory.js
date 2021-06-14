const blogCategory = (sequelize, DataTypes) => {
    const blogCategory = sequelize.define("blogCategory", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
    return blogCategory;
  };
  
  export default blogCategory;
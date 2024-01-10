// user.js
const User = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        // Model attributes are defined here
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    },{
        // This is the option that allows you to specify the table name
        tableName: 'users',
        underscored: true,
    });

    User.associate = models => {

    };

    return User;
};

export default User;
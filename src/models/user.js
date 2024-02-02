import bcrypt from "bcrypt";
// user.js
const User = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            // Model attributes are defined here
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
        },
        {
            // This is the option that allows you to specify the table name
            tableName: "users",
            underscored: true,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = bcrypt.genSaltSync(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        },
    );

    return User;
};

export default User;

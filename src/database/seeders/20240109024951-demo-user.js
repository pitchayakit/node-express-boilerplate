"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = [];
        const password = "test";
        for (let i = 0; i < 100; i++) {
            // replace 10000 with the number of records you want to create
            const salt = bcrypt.genSaltSync(10);

            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await bcrypt.hash(password, salt),
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        return queryInterface.bulkInsert("users", users);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    },
};

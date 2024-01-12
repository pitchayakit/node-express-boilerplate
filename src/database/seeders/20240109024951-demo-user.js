'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        const users = [];
        for (let i = 0; i < 100; i++) { // replace 10000 with the number of records you want to create
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                created_at: new Date(),
                updated_at: new Date()
            });
        }
        return queryInterface.bulkInsert('users', users);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
import { promisify } from "util";

const getAddressAsync = promisify(getAddress);

function getUser() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                firstName: "João",
                dateOfBirth: new Date()
            });
        }, 1000);
    });
};

function getPhone(idUser) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                ddd: "90",
                phone: "84848484"
            });
        });
    });
};

function getAddress(idUser, callback) {
    setTimeout(function () {
        return callback(null, {
            road: "rua super interessante",
            number: 8080
        })
    }, 1000);
}

async function main() {
    try {
        const user = await getUser();
        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ]);

        const phone = result[0];
        const address = result[1];

        console.log(`
        Name: ${user.firstName},
        Phone Number: (${phone.ddd}) ${phone.phone},
        Address: ${address.road}, ${address.number}
        `);
    } catch (error) {
        console.error(error);
    };
};

main();
export interface UserObjectInterface {
	_id: string;
	firstName: string;
	lastName: string;
	company: string;
	email: string;
	productServiceDescription: string;
	userIsVerified: boolean;
}

export interface UserResponseObject {
	user: UserObjectInterface;
}

// {
//     "user": {
//         "_id": "60e9d5a7d58afb141e45683a",
//         "firstName": "Lukas",
//         "lastName": "Steiner",
//         "company": "",
//         "email": "x@gmail.com",
//         "productServiceDescription": "Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla's current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services.",
//         "userIsVerified": true,
//         "createdAt": "2021-07-10T17:15:19.921Z",
//         "updatedAt": "2021-07-26T15:08:34.211Z",
//         "__v": 5
//     }
// }

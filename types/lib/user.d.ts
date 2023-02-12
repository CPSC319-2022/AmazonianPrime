export interface User {
    firstName: string;
    lastName: string;
    address: {
        city: string;
        province: string;
        streetAddress: string;
        postalCode: string;
    };
}

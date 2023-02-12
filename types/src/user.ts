export interface User {
    firstName: string;
    lastName: string;
    address: {
      city: string;
      province: string;
      streetAddress: string;
      postalCode: string;
      // 2366 Main Mall, Vancouver, BC V6T 1Z4
    };
  }
  
export type SignupData = {
    id: string;
    user: {
        email: string;
        password: string;
    };
    person: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        number: string;
    };
};

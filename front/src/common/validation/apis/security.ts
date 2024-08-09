export const isOffSize = {
    email: (email: string) => email.length < 4 || email.length > 100,
    password: (password: string) => password.length < 4 || password.length > 50,
    name: (name: string) => name.length < 2 || name.length > 50,
    address: {
        postalCode: (postalCode?: string) => postalCode && postalCode.length > 10,
        address: (address?: string) => address && address.length > 100,
        detailAddress: (detailAddress?: string) => detailAddress && detailAddress.length > 200
    }
} as const;

export const isNot = {
    email: (email: string) => !email.match(/^.+@.+$/)
} as const;

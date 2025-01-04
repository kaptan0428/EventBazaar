// Types related to authentication

// If you have an interface declared using declare in a .d.ts file, 
// it is available globally within the module or file where it is declared. 
// This means you don't need to import it explicitly in your Login.tsx file. 
// You can directly use the declared interface.

// declare interface Role {
//     ADMIN: string,
//     ORGANIZER: string,
//     USER: string
// }


declare interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    phone: string;
}
  
declare interface LoginRequest {
    email: string;
    password: string;
}

declare interface LoginResponse {
    jwtToken: string;
}

declare interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[];
    phone: string;
}

declare interface passwordUpdateRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

declare interface UserUpdateRequest {
    firstName: string;
    lastName: string;
    phone: string;
}

// ''declare' vs 'export' keyword



  
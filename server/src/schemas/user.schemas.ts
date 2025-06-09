import { r } from "@faker-js/faker/dist/airline-BUL6NtOJ";

export function userSchema(body: any) {
   

    function registerSchema() {
        const requiredFields = [
            "email",
            "password",
            "firstName",
            "lastName",
            "passwordConfirmation",
        ];
        // Check for missing required fields
        for (const field of requiredFields) {
            if (!body[field]) {
                throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        }

        // Check for extra fields
        const extraFields = Object.keys(body).filter((key) => !requiredFields.includes(key));
        if (extraFields.length > 0) {
            throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
        }

        // Additional validations
        if (body.password !== body.passwordConfirmation) {
            throw new Error("Passwords do not match");
        }
        if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            throw new Error("Invalid email format");
        }
        if (body.firstName && body.firstName.length < 1) {
            throw new Error("First name must be at least 1 character long");
        }
    }

    function loginSchema() {
        const requiredFields = ["email", "password"];
        // Check for missing required fields
        for (const field of requiredFields) {
            if (!body[field]) {
                throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        }

        // Check for extra fields
        const extraFields = Object.keys(body).filter((key) => !requiredFields.includes(key));
        if (extraFields.length > 0) {
            throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
        }

        // Additional validations
        if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            throw new Error("Invalid email format");
        }
    }
    function updatePartialyOrCompletlySchema() {
        const passwordFields = ["oldPassword", "newPassword", "passwordConfirmation"];
        const allFields = [
            "firstName",
            "lastName",
            "email",
            ...passwordFields
        ];

        // Check for extra fields
        const extraFields = Object.keys(body).filter((key) => !allFields.includes(key));
        if (extraFields.length > 0) {
            throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
        }

        // Additional validations
        if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            throw new Error("Invalid email format");
        }
        if (body.firstName && body.firstName.length < 1) {
            throw new Error("First name must be at least 1 character long");
        }

        // If any password field is provided, validate all password fields
        const hasPasswordFields = passwordFields.some((field) => body[field] !== undefined);
        if (hasPasswordFields) {
            for (const field of passwordFields) {
                if (!body[field]) {
                    throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                }
            }
            if (body.newPassword !== body.passwordConfirmation) {
                throw new Error("New passwords do not match");
            }
        }
    }

    function updateByIdSchema(){
        const requiredFields = ["roleId"];
        // Check for missing required fields
        for (const field of requiredFields) {
            if (!body[field]) {
                throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        }
        // Check for extra fields
        const extraFields = Object.keys(body).filter((key) => !requiredFields.includes(key));
        if (extraFields.length > 0) {
            throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
        }
        // Additional validations check if roleId is a valid UUID
        if (body.roleId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.roleId)) {
            throw new Error("Invalid roleId format");
        }
    }

        return {
            registerSchema,
            loginSchema,
            updatePartialyOrCompletlySchema,
            updateByIdSchema
        };
}
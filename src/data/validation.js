export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export const isPhone = (value) => /^\+?[0-9\s-]{6,}$/.test(value.trim());

export function validate(values, rules) {
    const errors = {};
    Object.entries(rules).forEach(([field, check]) => {
        const message = check(values[field] ?? '', values);
        if (message) errors[field] = message;
    });
    return errors;
}

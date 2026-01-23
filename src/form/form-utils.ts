export function randomInputId() {
    return new Date().getTime().toString() + Math.random().toString(36).substring(2);
}
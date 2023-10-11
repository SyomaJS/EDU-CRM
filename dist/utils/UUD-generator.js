function generateShortUUID() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let shortUUID = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortUUID += characters.charAt(randomIndex);
    }
    return shortUUID;
}
//# sourceMappingURL=UUD-generator.js.map
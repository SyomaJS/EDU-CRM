function generateShortUUID(): string {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let shortUUID: string = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    shortUUID += characters.charAt(randomIndex);
  }

  return shortUUID;
}

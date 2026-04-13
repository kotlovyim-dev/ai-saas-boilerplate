const { createJiti } = require("jiti");

const jiti = createJiti(__filename);

module.exports = jiti("./src/generated/prisma/client/client.ts");

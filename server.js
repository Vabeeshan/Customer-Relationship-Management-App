require("dotenv").config();
const logger = require("./src/utils/logger");
const app = require("./app.js");

app.listen(process.env.PORT, () => {
    logger.log(`Server is running on port ${process.env.PORT}`);

});
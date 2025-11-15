import app from "../app";

/**
 * Server Setup
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require("http",).createServer(app,);

/**
 * Port Setup
*/

function normalizePort(val: string | undefined,): number | boolean {
    if (!val) return false;

    return parseInt(val, 10,);
}

const port = normalizePort(process.env.PORT,);

if (!port) {
    throw new Error("Port not available",);
}

/**
 * Server Implementation
 */

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App started on port ${port}, ${process.env.NODE_ENV.toUpperCase()} mode`,);
},);

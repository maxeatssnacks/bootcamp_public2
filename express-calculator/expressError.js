class ExpressError extends Error {
    constructor(msg, status) {
        super();
        this.message = msg;
        this.status = status;
        console.error(this.stack);
    }
}

module.exports = ExpressError;
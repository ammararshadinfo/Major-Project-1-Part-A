class ExpressError extends Error{
    constructor(StatusCode,message){
        super();
        this.statusCode=StatusCode;
        this.message=message;
    }
}

module.exports=ExpressError;
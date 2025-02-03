class BaseError extends Error{
    constructor(name,httpStatusCode,description=null,isOptional=false){
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.httpStatusCode = httpStatusCode;
        this.isOptional = isOptional;
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports = BaseError;
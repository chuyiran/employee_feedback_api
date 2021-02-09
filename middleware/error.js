//错误处理
class  ErrorResponse extends Error{
    constructor(message,statusCode) {
        super(message);
        this.statusCode=statusCode
    }
}

const errorHandler = (err, req, res, next) => {
    // console.log(err.stack);
    //id错误处理
    if (err.name == 'CastError') {
        const message = `Resource not found with id of ${err.value}`
        err = new ErrorResponse(message, 404)
    }
    //返回重置字段值报错
    if (err.code == 11000) {
        const message = '输入了重复的字段值!'
        err = new ErrorResponse(message, 400)
    }
    //检验失败验证
    if (err.name == "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message)
        err = new ErrorResponse(message, 400)
    }
    res.status(err.statusCode || 500)
        .json({
            success: false,
            error: err.message || 'server is error'
        })
}
module.exports = errorHandler
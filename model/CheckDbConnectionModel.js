class CheckDbConnectionModel{
    constructor(req,res,connection){
        this.req = req;
        this.res = res;
        this.connection = connection;

        this.initialize = this.initialize.bind(this);
        this.initialize();
    }

    initialize(){
        try {
            this.connection.query('SELECT * from user', (error, results, fields)=> {
                if (error) throw error;
                this.res.send("DB Is Connected Successfully, Yeppie!!")
            });
            
        } catch (error) {
            console.log("Db Connection",error)
            this.res.sendStatus(500,error) // equivalent to res.status(500).send('Internal Server Error')
        }
    }
}

module.exports = CheckDbConnectionModel;
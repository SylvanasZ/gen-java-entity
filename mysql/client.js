var mysql =  require("mysql");
// import mysql from "mysql";

class MysqlClient{
    constructor(host, port, user, password, database){
        this.database = database;
        this.conn = mysql.createConnection({
            host, port, user, password, database,
              connectTimeout: 2000 
        })
        
    }

    query(...params){
        try{
            this.conn.connect()
            this.conn.query(...params)
        }catch(e){
            console.log(e)
            throw e
        }finally{
            this.conn.end()
        }
    }

    test(){
        try{
            this.conn.connect()
        }catch(e){
            console.log(e)
            throw e
        }finally{
            this.conn.end()
        }
    }

    getTableMetaInfo(tableName, next, ...params){
        let sql = `select COLUMN_NAME, DATA_TYPE from information_schema.COLUMNS where table_name = '${tableName}' and table_schema = '${this.database}';`
        this.query(sql, (e, r)=>{
            if(e) throw e
            if(next) next(tableName, r, ...params)
        })
    }
}

const client = new MysqlClient("localhost", 3306, "root", "2168519", "demo_master")

// export default MysqlClient;

module.exports = {
    MysqlClient
}


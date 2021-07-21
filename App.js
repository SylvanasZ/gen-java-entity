var {MysqlClient} = require("./mysql/client");
var {genJavaFile} = require('./transfer/mapper');

const host = ""
const port = 3306
const user = ""
const password = ""
const db = ""
const annotations = ["@Data"]

const client = new MysqlClient(host, port, user, password, db)

client.getTableMetaInfo('resident', genJavaFile, annotations);
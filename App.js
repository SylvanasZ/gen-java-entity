var { MysqlClient } = require("./mysql/client");
var { genJavaFile } = require('./transfer/mapper');

const host = "localhost"
const port = 3306
const user = "root"
const password = "dontbase"
const db = "test"
const annotations = ["@Getter", "@Setter"]

const client = new MysqlClient(host, port, user, password, db)

client.getTableMetaInfo('expos_sys_function', genJavaFile, annotations);
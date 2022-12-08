const STRING = "String"
const INT = "Integer"
const DOUBLE = "Double"
const LONG = "Long"
const DATE = "Date"
const TIME = "Time"

const MYSQL_KEY_MAPPING = {
    "varchar": STRING,
    "text": STRING,
    // 数字相关
    "int": INT,
    'tinyint': INT,
    'mediumint': INT,
    'smallint': INT,
    'bit': INT,
    'bigint': LONG,
    'decimal': DOUBLE,
    'float': DOUBLE,
    'double': DOUBLE,
    // 时间相关
    'timestamp': DATE,
    'date': DATE,
    'datetime': DATE,
    'time': TIME,
    'year': STRING
}

const MYSQL_IMPORT_MAPPING = {
    'Date': "import java.util.Date;",
    'Time': "import java.sql.Time;",
}

const ANNOTATION_IMPORT_MAPPING = {
    '@Data': "import lombok.Data;",
    '@Getter': "import lombok.Getter;",
    '@Setter': "import lombok.Setter;"
}

module.exports = {
    MYSQL_KEY_MAPPING,
    MYSQL_IMPORT_MAPPING,
    ANNOTATION_IMPORT_MAPPING
}
var { MYSQL_KEY_MAPPING, MYSQL_IMPORT_MAPPING, ANNOTATION_IMPORT_MAPPING } = require('./mapping')
const clipboardy = require('clipboardy');
// import {KEY_MAPPING, DENP_MAPPING} from './mapping';

const lineToCamelCase = (line) => {
    var p = /_[a-z]/g
    while (line.search(p) >= 0) {
        let index = line.search(p)
        line = line.slice(0, index) + line.slice(index + 1, index + 2).toUpperCase() + line.slice(index + 2)
    }
    return line;
}

const firstUpper = (word) => {
    if (!word) return word
    return word.slice(0, 1).toUpperCase() + word.slice(1)
}

const genJavaFile = (tname, trows, annotations) => {
    if (null === annotations)
        annotations = []
    if ('string' === typeof annotations)
        annotations = [annotations]
    var structure = [];
    var imports = [];
    for (i in trows) {
        let d = trows[i]
        let dt = d.DATA_TYPE
        let dn = d.COLUMN_NAME
        structure.push({
            jtype: MYSQL_KEY_MAPPING[dt] || "String",
            jname: lineToCamelCase(dn)
        })
        let jtype = MYSQL_KEY_MAPPING[dt];
        if (MYSQL_IMPORT_MAPPING[jtype] && imports.indexOf(MYSQL_IMPORT_MAPPING[jtype]) < 0)
            imports.push(MYSQL_IMPORT_MAPPING[jtype])
    }
    for (i = 0; i < annotations.length; i++)
        if (ANNOTATION_IMPORT_MAPPING[annotations[i]])
            imports.push(ANNOTATION_IMPORT_MAPPING[annotations[i]])
    // console.log(structure)
    var OUT = "";
    OUT = OUT + imports.join("\n") + "\n" + "\n";
    OUT = OUT + annotations.join("\n") + "\n";
    OUT = OUT + "public class " + firstUpper(lineToCamelCase(tname)) + "{\n"
    for (let i = 0; i < structure.length; i++) {
        let line = "    private " + structure[i].jtype + " " + structure[i].jname + ";\n"
        OUT = OUT + line
    }
    OUT = OUT + "}"
    console.log(OUT)
    clipboardy.write(OUT)
}

module.exports = {
    genJavaFile
}

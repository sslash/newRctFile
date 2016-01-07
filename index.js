//
// Simple tool to create a React component with accompanying Jest test
// The generated files are oppinionated
// Usage: newRctFile <filename>

var args = process.argv;
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

if (args.length < 3) {
    console.error('Usage: node reactfile <path>');
    process.exit(1);
}

//
// templates
//
var jsFile = fs.readFileSync(path.join(__dirname, 'templates', 'js.js')).toString();
var testFile = fs.readFileSync(path.join(__dirname, 'templates', 'jsTest.js')).toString();


var newJsFile = args[2];

if (!newJsFile.match('^[\.\/]')) {
    newJsFile = path.join('.', newJsFile);
}

var filePath = path.parse(newJsFile);
var reactName = filePath.name;
var baseName = filePath.base;
var newTestFileDir = path.join(filePath.dir, '__tests__', reactName + '-test.js');



var jsFileContent = jsFile.replace(/__REACT_CLASS__/g, reactName);
var jsTestFileContent = testFile
    .replace(/__REACT_CLASS__/g, reactName)
    .replace(/__JSFILENAME__/g, baseName)
    .replace(/__CLASSINSTANCE__/g, reactName + 'Comp');


writeFile(newJsFile, jsFileContent, function (err) {
    handleError(err);

    writeFile(newTestFileDir, jsTestFileContent, function (err) {
        handleError(err);
        console.log('Created ', baseName, '__tests__' + reactName + '-test.js')
        process.exit(0);
    });
});


function handleError(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}

function writeFile (file, contents, cb) {
    var fileDirectory = path.parse(file).dir;
    mkdirp(fileDirectory, function (err) {
        if (err) return cb(err)
        fs.writeFile(file, contents, cb)
    })
}

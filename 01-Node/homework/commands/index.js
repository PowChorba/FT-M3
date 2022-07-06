var fs = require('fs');

fs.readdir('.', function(err, files){
    if(err) throw err;
    files.forEach(function(file){
        process.stdout.write(file.toString() + '\n');
    })
    process.stdout.write('prompt > ')
})











module.exports = {
    pwd: function(){},
    date: function(){},
    fs: function(){}
}
const mongoose = require('mongoose')

const connection_string = process.env.CONNECTIONSTRING

mongoose.connect(connection_string).then((res)=>{
    console.log("MONGOOSE ATLAS CONNECTED SUCCESSFULLY WITH SERVER");
}).catch(err=>{
    console.log("MONGOOSE connection failed!");
    console.log(err);
})
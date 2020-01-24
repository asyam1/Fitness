
var display = "./random.txt";
var SimpleFileWriter = require('simple-file-writer');
var writer = new SimpleFileWriter(display);
writer.setupFile(display);

var PORT = process.env.PORT;
var HOST = require('my-local-ip')();
var dgram = require('dgram');
var server = dgram.createSocket('udp4');


var appdata=[];
var steps="";
var temperature="";
var x="";
var y="";
var z="";
var speed="";
var calories=0;

module.exports = class appserver{


    constructor(){
        this.startserver();
    }

    startserver(){
        server.on('listening', function () {
            var address = server.address();
            console.log('UDP Server listening on ' + address.address + ":" + address.port);
        });
        
        this.message(data=> {
            console.log(data);
        });
        
        server.bind(PORT, HOST);
    }


    message(callback){
        function pushData(msg){
            if(appdata==undefined){
                appdata =[];
            }
            appdata.push(msg);
        }

        server.on('message', function (message, remote) {
            writer.write(message + "\n");
            pushData(new Date() +' '+message);
            callback(remote.address + ':' + remote.port +' - ' + message);
        });
    }

    getData(){
        return appdata;
    }

    
}

function parseData(callback){
    if(appdata[0]==undefined){
        callback()
    }else{
        info = appdata[0];//x3.45, y4.5, z5.6.....
        var res = info.split(", ");

        x = res[0].substring(1);
        y = res[1].substring(1);
        z = res[2].substring(1);
        steps = res[3].substring(1);
        temperature = res[4].substring(1);

        var s = 0;
        s = res[3].substring(1);

        for (var i=0; i <= s ;i++){
            calories = calories + 0.1; 
        }

        appdata.shift()
        callback()
    }
}

var getCal = function(){
    parseData(()=>{
        return calories;
    });
}

var getX = function(){
    parseData(()=>{
        return x;
    });
}

var getY = function(){
    parseData(()=>{
        return y;
    });
}

var getZ = function(){
    parseData(()=>{
        return z;
    });
}

function getSpeed(){
    parseData(()=>{
        return speed;
    });
}

function getSteps(){
    parseData(()=>{
        return steps;
    });
}
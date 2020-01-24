
var display = "./random.txt";
var SimpleFileWriter = require('simple-file-writer');
var writer = new SimpleFileWriter(display);

const Vue = require('vue')
const express = require('express');
const bodyParser= require('body-parser');
const json = require('express-json');
const urlencodedParser = require('urlencoded-parser');
const app = express();
const expressVue = require('express-vue');
const path = require('path');
const net = require("net");
var PORT = process.env.PORT;
var appserver = require('./appserver');
const MongoClient = require('mongodb').MongoClient;
const renderer = require('vue-server-renderer').createRenderer();
const sendmail = require('sendmail')();
var ObjectId = require("bson-objectid");
var cookieParser = require('cookie-parser');


var ap = new appserver();

var deleteUser = function(callback,id){
    MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{
        if (err){ 
        console.log("Mongo Connect Fail");
        return console.log(err);}else{
            console.log("Connected to mongo");
        }//error check for connection with mongo
        var db = database;
        var coll = 'users';//Name for collection
        db.collection(coll).deleteOne({_id:ObjectId(id)}).then(function(result){
            console.log('deleted');
            callback()
        }).catch(function(err){
            console.log('not deleted');
            callback()
        });
    })
}

var insertDocument = function(data) { //This function inserts a document with in the given collection name
    MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{ //selecting a database that does not exist yet which will be create once the collection is instantiated
    
        if (err){ 
        console.log("Mongo Connect Fail");
        return console.log(err);}else{
            console.log("Connected to Mongo db");
        }//error check for connection with mongo
        var db = database;
        var coll = 'users';//Name for collection

    db.collection(coll).insertOne( {
          "fname":data.fname,"lname":data.lname,"user":data.user,"pass":data.pass,"email":data.email, "role": data.role
    }, function(err, result) {
    if(err){
    console.log("Insert Document Error"); //InsertDocument error checking
    console.log(err);
    throw err;}else{
        console.log("added user");
    }
    });
});
}

var login = function (callback,u,p){
    MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{ //selecting a database that does not exist yet which will be create once the collection is instantiated
    
        if (err){ 
        console.log("Mongo Connect Fail");
        return console.log(err);}else{
            console.log("Connected to mongo");
        }//error check for connection with mongo
        var db = database;
        var coll = 'users';//Name for collection
        
        db.collection(coll).findOne({user:u,pass:p}).then(function(result){
            console.log(result);
            callback(result);
        }).catch(function(err){
            console.log(err);
            callback(false);
        });
    });
}
var findUser = function(callback,id){
    MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{
        if (err){ 
        console.log("Mongo Connect Fail");
        return console.log(err);}else{
            console.log("Connected to mongo");
        }//error check for connection with mongo
        var db = database;
        var coll = 'users';//Name for collection
        db.collection(coll).findOne({_id:ObjectId(id)}).then(function(result){
            console.log(result);
            callback(result)
        }).catch(function(err){
            console.log(err);
            callback(err)
        });
    })
};

var getUsers= function(callback){
    MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{
        if (err){ 
        console.log("Mongo Connect Fail");
        return console.log(err);}else{
            console.log("Connected to mongo");
        }//error check for connection with mongo
        var db = database;
        var coll = 'users';//Name for collection
        var a = db.collection(coll).find().toArray().then(function(result){
            console.log(result);
            callback(result)
        }).catch(function(err){
            console.log(err);
            callback(err)
        });
    })
}


var validate = function(callback,uinfo){
    errors = [];
    errors[0] = false;
    errors[1] = false;
    errors[2] = false;
    if(uinfo.pass.length < 6 || !/\d/.test(uinfo.pass) || !/[A-Z]/.test(uinfo.pass)){
        errors[0]=true;
    }
    if(uinfo.pass != uinfo.cpass){
        errors[1]=true;
    }
    if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(uinfo.email)){
        errors[2]=true;
    }
    callback(errors);
}

var validatePass = function(callback,uinfo){
    errors = [];
    errors[0] = false;
    errors[1] = false;
    if(uinfo.pass.length < 6 || !/\d/.test(uinfo.pass) || !/[A-Z]/.test(uinfo.pass)){
        errors[0]=true;
    }
    if(uinfo.pass != uinfo.cpass){
        errors[1]=true;
    }
    callback(errors);
}

var sendEmail = function(callback,e){
    var account;

    MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{
        if (err){ 
        console.log("Mongo Connect Fail");
        return console.log(err);}else{
            console.log("Connected to mongo");
        }//error check for connection with mongo
        var db = database;
        var coll = 'users';//Name for collection

        db.collection(coll).findOne({email:e}).then(function(result){
            console.log(result);
            account = result;

        
    
          sendmail({
            to: account.email,
            from: 'no-reply@Biodex.net',
            // Subject of the message
            subject: 'Biodex Account Recovery',
            
            // HTML body
            html: '<p>Please click link to reset password: <a href="http://localhost:8080/reset/'+account._id+'">RESET PASSWORD</a></p>'
          }).then(()=>{
              console.log("sent!");
              callback(true);
          }).catch((err)=>{
              console.log(err);
              callback(false);
          });
});
})
};



console.log('Running');
app.listen(PORT||8080, () =>{
console.log('listening on '+PORT||8080);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(json());
app.use(urlencodedParser);
app.use(cookieParser());

const vueOptions ={
	rootPath: __dirname,
	vue:{
		head:{
			meta:[{
				script: "https://unpkg.com/vue"
			},{
				script: 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js'
			},{
				script: './pranoy/js/jquery-3.2.1.min.js'
			},{
				script: './pranoy/js/bootstrap.min.js'
			},{
				style: './pranoy/css/bootstrap.min.css'
			},{
				style: './pranoy/css/custom.css'
			},{
                style: './pranoy/css/font-awesome.min.css'
            }]
		}
	}
}
const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

app.set('view engine', 'vue');

app.get("/js/jquery-3.2.1.min.js",function(req,res){
    res.sendfile("./pranoy/js/jquery-3.2.1.min.js");
});

app.get("/assets/js/vendor/jquery.min.js",function(req,res){
    res.sendfile("./pranoy/assets/js/vendor/jquery.min.js");
});

app.get("/js/bootstrap.min.js",function(req,res){
    res.sendfile("./pranoy/js/bootstrap.min.js");
});

app.get('/css/custom.css',function(req,res){
	res.sendfile('./pranoy/css/custom.css');
})

app.get('/css/bootstrap.min.css',function(req,res){
	res.sendfile('./pranoy/css/bootstrap.min.css');
})

app.get('/css/font-awesome.min.css',function(req,res){
	res.sendfile('./pranoy/css/font-awesome.min.css');
})

app.get('/fonts/fontawesome-webfont.woff2',function(req,res){
    res.sendfile('./pranoy/fonts/fontawesome-webfont.woff2');
})

app.get('/fonts/fontawesome-webfont.woff',function(req,res){
    res.sendfile('./pranoy/fonts/fontawesome-webfont.woff');
})

app.get('/fonts/fontawesome-webfont.ttf',function(req,res){
    res.sendfile('./pranoy/fonts/fontawesome-webfont.ttf');
})


app.get('/fitness.html',function(req,res){
    res.sendfile('./fitness.html');
})

app.get('/tracking.html',function(req,res){
    res.sendfile('./tracking.html');
})

app.get('/history',function(req,res){
    var stuff = ap.getData();
    console.log(stuff);
    var ids = req.query.id;
    const data={
        info: stuff,
        profileLink:"/profilepage.vue?id="+ids,
        his: "/history?id="+ids,
        act:"/users?link="+ids
    }
    res.renderVue('./history',data);
})

app.get('/users',function(req,res){
    getUsers((stuff)=>{
        var ids = req.query.link
        const data = {
            act:"/users?link="+ids,
            us: stuff,
            profileLink:"/profilepage.vue?id="+ids,
            his: "/history?id="+ids
        };
        res.renderVue("./users",data);
    })
})

app.post('/users',function(req,res){
    var ids = req.query.link;
    deleteUser(()=>{
        res.redirect('/home');
    },req.body.delus);
})

app.get('/',function(req,res){
    res.sendfile("./pranoy/login_land.html");
});

app.get('/register.vue',function(req,res){
    const data = {
        usern:"",
        passw:"",
        cpassw:"",
        fn:"",
        ln:"",
        em:"",
        errors:"",
        e1:false,
        e2:false,
        e3:false
    };
    res.renderVue("./pranoy/register",data);
});

app.post('/register.vue',function(req,res){
    uinfo = req.body;
    validate((err)=>{
        if(!err[0] && !err[1] && !err[2]){ 
        insertDocument(req.body);
        res.redirect('/');
        }else{
        const data = {
            errors:true,
            e1:err[0],
            e2:err[1],
            e3:err[2],
            usern:req.body.user,
            passw:req.body.pass,
            cpassw:req.body.cpass,
            fn:req.body.fname,
            ln:req.body.lname,
            em:req.body.email
        };
        res.renderVue('./pranoy/register',data);
    }
    },uinfo);
});

app.get('/forgotPassword.vue',function(req,res){
    const data = {
        em:""
    };
    res.renderVue("./pranoy/forgotPassword",data);
});

app.post('/forgotPassword.vue',function(req,res){
    if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(req.body.email)){
    sendEmail((err)=>{
    const data = {
        em:"",
        sent: err
    };
    res.renderVue("./pranoy/forgotPassword",data);
    },req.body.email);
    }else{
        const data = {
            em:"",
            sent: false
        };
        res.renderVue("./pranoy/forgotPassword",data);
    }
});

app.get('/reset/:token',function(req,res){
    console.log("reset password for "+req.params.token);
   res.renderVue("./pranoy/reset",{
       ps:"",
       cps:"",
       id: req.params.token
   });
});

app.post('/reset/reset.vue',function(req,res){
    validatePass((data)=>{
        if(!data[0]&&!data[1]){
            MongoClient.connect('mongodb://admin:admin@ds235778.mlab.com:35778/biodex',(err, database)=>{ //selecting a database that does not exist yet which will be create once the collection is instantiated
            
                if (err){ 
                console.log("Mongo Connect Fail");
                return console.log(err);}else{
                    console.log("Connected to mongo");
                    console.log(req.body.id);
                }//error check for connection with mongo
                var db = database;
                var coll = 'users';//Name for collection
                
                db.collection(coll).updateOne({_id:ObjectId(req.body.id)},{$set:{pass:req.body.pass}});
            });
            res.redirect('/');
        }else{
            res.renderVue('./pranoy/reset',{
                errors:true,
                e1:data[0],
                e2:data[1],
                ps:req.body.pass,
                cps:req.body.cpass,
                id: req.body.id
            });
        }
    },req.body);
});

app.post('/',function(req,res){
    login((data)=>{
    if(data){
        res.redirect("/login_success?id="+data._id);
    }else{
        res.redirect("/login_error.html");
    }
    },req.body.username,req.body.pwd);
});

app.get('/login_error.html',function(req,res){
    res.sendfile("./pranoy/login_error.html");
});

app.post('/login_error.html',function(req,res){
    login((data)=>{
    if(data){
        res.redirect("/login_success?id="+data._id);
    }else{
        res.sendfile("/login_error.html");
    }
    },req.body.username,req.body.pwd);
});

app.get("/login_success",function(req,res){
    res.cookie('id',req.query.id,{path:'/home',maxAge: 24*60*60});
    res.cookie('login',true,{path:'/home',maxAge: 24*60*60});
    res.redirect("/home?id="+req.query.id);

});

app.post("/login_success.html",function(req,res){
    res.cookie('id',req.query.id,{path:'/home',maxAge: 24*60*60});
    res.cookie('login',true,{path:'/home',maxAge: 24*60*60});
    res.redirect("/home?id="+req.query.id);
});

app.get('/home',function(req,res){
    let ids;
    if(req.cookies.id){
        ids = req.cookies.id;
    }else
    if(req.cookies.login){
        ids = req.query.id
    }else{
        res.redirect('/');
    }
    findUser((data)=>{
        switch(data.role){
            case 'fitness': res.renderVue('./fitness',{
                                profileLink:"/profilepage.vue?id="+ids,
                                his: "/history?id="+ids
                            });
                            break;
            case 'tracking': res.renderVue('./tracking',{
                                profileLink:"/profilepage.vue?id="+ids,
                                his: "/history?id="+ids
                            });
                            break;
            case 'admin': res.renderVue('./admin',{
                                id: "/users?link="+ids,
                                profileLink:"/profilepage.vue?id="+ids,
                                his: "/history?id="+ids
                            });
                            break;
            default: res.redirect('/');
        }
    },ids);
})

app.get('/logout',function(req,res){
    res.clearCookie('id',{path:'/home'});
    res.clearCookie('login',{path:'/home'});
    res.redirect('/');
})

app.get('/profilepage.vue', function(req, res){
    findUser((d)=>{
        const data = {
            firstName: d["fname"],
            lastName: d["lname"],
            username: d["user"],
            password: d["pass"],
            email: d["email"]
        };
        res.renderVue('./profilepage',data);
    },req.query.id);
})

app.get('/D3_RealTime.html',function(req,res){

    res.sendfile("./D3_RealTime.html");
})

app.get('/Map.html',function(req,res){
    
    res.sendfile("./Map.html");
})

app.get('/toronto_topo.json',function(req,res){
    
    res.sendfile("./toronto_topo.json");
})

app.get('/guage.html',function(req,res){
    
    res.sendfile("./guage.html");
})

app.get('/csv/random.csv',function(req,res){
    res.sendfile("./random.csv");
})

app.get('/random.csv',function(req,res){
    res.sendfile("./random.csv");
})

app.get('/pranoy/css/custom.css',function(req,res){
	res.sendfile('./pranoy/css/custom.css');
})

app.get('/pranoy/css/bootstrap.min.css',function(req,res){
	res.sendfile('./pranoy/css/bootstrap.min.css');
})

app.get('/pranoy/css/font-awesome.min.css',function(req,res){
    res.sendfile('./pranoy/css/font-awesome.min.css');
})

app.get('/pranoy/fonts/fontawesome-webfont.woff2',function(req,res){
    res.sendfile('./pranoy/fonts/fontawesome-webfont.woff2');
})

app.get('/pranoy/fonts/fontawesome-webfont.woff',function(req,res){
    res.sendfile('./pranoy/fonts/fontawesome-webfont.woff');
})

app.get('/pranoy/fonts/fontawesome-webfont.ttf',function(req,res){
    res.sendfile('./pranoy/fonts/fontawesome-webfont.ttf');
})

app.get('/pranoy/css/bootstrap.min.css.map',function(req,res){
	res.sendfile('./pranoy/css/bootstrap.min.css.map');
})

app.get('/pranoy/js/bootstrap.min.js',function(req,res){
	res.sendfile('./pranoy/js/bootstrap.min.js');
})

app.get('/pranoy/js/jquery-3.2.1.min.js',function(req,res){
	res.sendfile('./pranoy/js/jquery-3.2.1.min.js');
})

app.get('/acc.html',function(req,res){
    res.sendfile('./acc.html');
})
app.get('/gyro2.html',function(req,res){
    res.sendfile('./gyro2.html');
})

app.get('/random.txt',function(req,res){
    res.sendfile("./random.txt");
})

app.get('/pranoy/img_avatar.png',function(req,res){
    res.sendfile("./pranoy/img_avatar.png");
})

app.get('/timer.html',function(req,res){
    res.sendfile("./timer.html");
})

app.get('/node_modules/easytimer.js/dist/easytimer.min.js',function(req,res){
    res.sendfile("./node_modules/easytimer.js/dist/easytimer.min.js");
})

app.get('/appserver.js',function(req,res){
    res.sendfile("./appserver.js");
})

app.get('/StepCounter.html',function(req,res){
    res.sendfile("./StepCounter.html");
})

app.get('/Calories.html',function(req,res){
    res.sendfile("./Calories.html");
})

app.get('/Temperature.html',function(req,res){
    res.sendfile("./Temperature.html");
})

app.get('/shoe.png',function(req,res){
    res.sendfile("./shoe.png");
})

app.get('/calorie.png',function(req,res){
    res.sendfile("./calorie.png");
})

app.get('/temp.png',function(req,res){
    res.sendfile("./temp.png");
})

app.get('/time.html',function(req,res){
    res.sendfile("./time.html");
})
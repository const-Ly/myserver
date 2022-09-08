var express = require("express")
var nunjucks = require("nunjucks");
var path = require("path")

var app = express()

app.use('/public', express.static(path.join(__dirname,"public")))

nunjucks.configure(join(__dirname,'./views'), {
    autoescape: true,
    express: app,
    noCache: true
})

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get("/image", function(req, res) {
	res.end("image")
})

app.get("/api/getAge", function(req, res){
        return res.json({
                code: 200,
                age:26
        })
})


app.get("/api/getName", function(req, res){
	return res.json({
		code: 200,
		name:"liuyong",
	})
})


app.get("*", function(req, res) {
	var name = "";
	if(req.path === '/'){
		name = "World";
	}else {
		name = res.path;
	}
	res.render('index.html', {
		name
	});
})


app.listen(3000, function(){
	console.log("running");
})

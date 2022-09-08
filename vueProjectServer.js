var express = require("express")
var nunjucks = require("nunjucks")
var path = require("path")

const {Api} = require("./sign")

var app = express()

app.use('./static', express.static(path.join(__dirname, "dist/static")))
app.use('./static', express.static(path.join(__dirname, "testOmega/static")))
app.use(express.static('testOmega'));
app.use(express.static('dist'));
app.use(express.static('testVue'));
app.use('vueTest', express.static('testVue'));
app.use('css',express.static('static/css'));
app.use(express.static(path.join(__dirname)))
//
nunjucks.configure(path.join(__dirname, './dist'), {
	autoescape: true,
	express: app,
	noCache: true
})

//设置跨域访问
app.all('*', function(req, res, next) {
	console.log(req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers', 'Content-type');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
	res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天
	next();
});


app.get("/image", function(req, res) {
	res.end("image")
})

app.get("/api/getAge", function(req, res) {
	return res.json({
		code: 200,
		age: 26
	})
})

app.post("/api/getSign", function(req, res) {
	console.log(req)
	// console.log(req.body)
	let username = req.query.userName;
	let time = req.query.time
	let sign = new Api(1400362759, "040a1f0a69d76284447dda580a7313ab36ced9705ccce0f6149a508ade8a7318")
	
	let signInfoStr = sign.genSig(username, time)
	
	return res.json({
		code: 200,
		sign: signInfoStr
	})
})

app.get("/api/getName", function(req, res) {
	return res.json({
		code: 200,
		name: "liuyong1",
	})
})

//app.get("/test/demo", function(req, res) {
//	return res.render('index.html')
//})



app.get("*", function(req, res) {
	var name = "";
//	if (req.path === '/') {

		return res.send(`我是端口3001，path为：${req.path}`)
//	}
})


app.listen(3001, function() {
	console.log("running == 3001");
})

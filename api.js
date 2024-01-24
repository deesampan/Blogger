import Express from "express";
import bodyParser from "body-parser";

const app = Express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let lastedId = 0
let data = [
    {
        content: "Yeahh",
        id : 0
    }
]

app.get("/",(req,res)=>{
    for(var i = 0;i<data.length;i++){
        data[i].id = i;
    }
    
    res.send(data);
});

app.post("/",(req,res)=>{
    console.log(req.body);
    let item = {
        content: req.body.content,
        id : lastedId + 1
    }
    data.push(item);
    lastedId += 1;
    console.log(data);
    res.send(data);
});

app.post("/edit",(req,res)=>{
    // console.log(req.body);
    const thatid = parseInt(req.body.id);
    const found = data.find((item)=>item.id===thatid)

    console.log(found);

    res.send(found);
});

app.post("/edit/:id",(req,res)=>{
    console.log(req.params.id,req.params.id)
    const thatid = parseInt(req.params.id);
    const thatcontent = req.body.content;
    data[thatid].content = thatcontent;
    res.status(200).send();
});

app.delete("/del/:id",(req,res)=>{
    const thatid = parseInt(req.params.id);
    data.splice(thatid,1);
    lastedId-=1;
    res.status(200).send();
})

app.listen(port,()=>{
    console.log("api is work!!");
})
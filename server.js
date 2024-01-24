import Express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",async(req,res)=>{
    try{
        const result = await axios.get("http://localhost:4000/");
        res.render("index.ejs",{data : result.data});
    }catch(error){
        res.render("index.ejs",{data : error});
    }
});

app.post("/",async (req,res)=>{
    if (req.body.freeform === ''){
        return
    }
    try{
        await axios.post("http://localhost:4000/",{content:req.body.freeform});
        res.redirect("/");
    }catch(error){
        res.redirect("/");
    }
});

app.get("/edit/:id",async(req,res)=>{
    try{
        console.log(req.params.id)
        const result = await axios.post(`http://localhost:4000/edit`,{
            id:req.params.id
        });
        
        res.render("modify.ejs",{data:result.data});
    }catch(error){
        res.redirect("/");
    }
});

app.post("/edit",async(req,res)=>{
    console.log(req.body);
    try{
        console.log(req.params.id)
        await axios.post(`http://localhost:4000/edit/${req.body.but}`,{
            content: req.body.content
        });
        
        res.redirect("/");
    }catch(error){
        res.redirect("/");
    }
});

app.get("/del/:id",async(req,res)=>{
    try{
        await axios.delete(`http://localhost:4000/del/${req.params.id}`);
        
        res.redirect("/");
    }catch(error){
        res.redirect("/");
    }
});

app.listen(port,()=>{
    console.log("server is working!");
})
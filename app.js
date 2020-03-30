const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const dataPath = path.resolve(__dirname+"/db/data.json")



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.set('view engine' , 'pug')
app.set('views',path.resolve(__dirname+'/views'))

app.get('/',(req,res)=>{
    res.render('index')
})


app.get('/todo',(req,res)=>{
    fs.readFile(dataPath,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err)
            return
        }
        data = JSON.parse(data);
        res.status(200).send(data)
    })
})

app.post('/todo',(req,res)=>{
    const todo = req.body
    fs.readFile(dataPath,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err)
            return
        }
        data = JSON.parse(data);
        data.push(todo)
        data = JSON.stringify(data)

        fs.writeFile(dataPath , data , (err)=>{
            if(err){
                console.log(err);
                res.status(500).send(err)
                return
            }
        })
        res.status(200).send(data)
    })
})

app.delete('/todo',(req,res)=>{
    const task = req.body
    fs.readFile(dataPath,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err)
            return
        }
        data = JSON.parse(data);
        data = data.filter(todo => todo.text !== task.text)
        data = JSON.stringify(data)

        fs.writeFile(dataPath , data , (err)=>{
            if(err){
                console.log(err);
                res.status(500).send(err)
                return
            }

            res.end()
        })
    })
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

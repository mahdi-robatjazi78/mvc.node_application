const fs = require('fs')
const path = require('path')
const dataPath = path.resolve(__dirname,'../../db/data.json')


const controller = {
    fetchAllData :(req,res)=>{
        fs.readFile(dataPath,(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send(err)
                return
            }
            data = JSON.parse(data);
            res.status(200).send(data)
        })
    },
    addTask:(req,res)=>{
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
    },
    removeTask:(req,res)=>{
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
    },
    updateTask:(req,res)=>{
        const oldTodo = req.body.oldTodo
        const newTodo = req.body.newTodo
    
        fs.readFile(dataPath,(err,data)=>{
            if(err){
                console.error(err);
                alert(err)
                return
            }
            
            data = JSON.parse(data)
            data.forEach((val,index)=>{
                if(val.text === oldTodo){
                    data[index] = newTodo
                }
            })
            data = JSON.stringify(data)
        
            fs.writeFile(dataPath,data,(err)=>{
                console.error(err)
                alert(err)
                return
            })
            res.end()
        })
    }
}

module.exports = controller
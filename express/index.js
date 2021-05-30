import express from 'express';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors())

let data = []

// Get Book Collection by Id and all
app.get('/books',function(req,res){
    console.log("All Books API")
    let book_name = req.query.name || null
    let book_reading_status = req.query.reading || null
    let book_finished_status = req.query.finished || null
    try{
        let all_book = []
        for(let x of data){
            if(book_name !== null && book_finished_status === null && book_reading_status === null){
                if(x["name"].toLowerCase()==book_name.toLowerCase() || x["name"].toLowerCase().includes(book_name.toLowerCase())){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else if(book_name === null && book_finished_status !== null && book_reading_status === null){
                if(x["finished"]==book_finished_status){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else if(book_name === null && book_finished_status === null && book_reading_status !== null){
                if(x["reading"]==book_reading_status){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else if(book_name !== null && book_finished_status !==null && book_reading_status === null){
                if(x["finished"]==book_finished_status && (x["name"].toLowerCase()==book_name.toLowerCase() || x["name"].toLowerCase().includes(book_name.toLowerCase()))){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else if(book_name !== null && book_finished_status === null  && book_reading_status !== null){
                if(x["reading"]==book_reading_status && (x["name"].toLowerCase()==book_name.toLowerCase() || x["name"].toLowerCase().includes(book_name.toLowerCase()))){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else if(book_name === null && book_finished_status !== null && book_reading_status !== null){
                if(x["reading"]==book_reading_status && x["finished"]==book_finished_status){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else if(book_name !== null && book_finished_status !== null && book_reading_status !==null){
                if(x["reading"]==book_reading_status && x["finished"]==book_finished_status && (x["name"].toLowerCase()==book_name.toLowerCase() || x["name"].toLowerCase().includes(book_name.toLowerCase()))){
                    let book = {"id":x["id"],
                                "name":x["name"],
                                "publisher":x["publisher"]};
                    all_book.push(book);
                }
            }
            else {
                let book = {"id":x["id"],
                            "name":x["name"],
                            "publisher":x["publisher"]};
                all_book.push(book);
            }
        }
        res.send({"status":"success",
                "data": {"books": all_book}
})
    }
    catch(err){
        res.status(500).send({
            "status":"error",
            "error_message": `${err.message}`}
        )
    }
})


app.get('/books/:bookId',function(req,res){
    console.log("Specifics Books API")
    try{
        let book_id = req.params.bookId
        let book_found = data.find(x => x.id == book_id)
        if(typeof book_found == "undefined"){
            res.status(404).send({
                "status":"fail",
                "message":"Buku tidak ditemukan"
            })
        }
        else{
            res.send({"status":"success",
                    "data": {"books": book_found}
    })
        }
        } catch(err){
        res.status(500).send({
            "status":"error",
            "error_message": `${err.message}`}
        )
    }
})


// Post Book to Collection
app.post('/books',function(req,res){
    console.log("Create API")
    let insertedAt = new Date().toISOString()
    let updatedAt = insertedAt
    let bodyRequest = req.body
    let uuid = uuidv4()
    let finishedStatus = false
    try {
        if(typeof bodyRequest.name == "undefined"){
            res.status(400).send({
                'status':'fail',
                'message':'Gagal menambahkan buku. Mohon isi nama buku'    
            })
        }
        else if(bodyRequest.readPage > bodyRequest.pageCount){
        res.status(400).send({
            'status':'fail',
            'message':'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        }
        else {
            if(bodyRequest.readPage == bodyRequest.pageCount){
            finishedStatus = true}
            let book = {...bodyRequest, id:uuid, insertedAt:insertedAt , updatedAt:updatedAt, 
                    finished:finishedStatus}
            data.push(book)
            res.status(201).send({
            'status':"success",
            'message':'Buku berhasil ditambahkan',
            'data':{
                'bookId':uuid
            }
        })
        } 
    }
    catch(err){
        res.status(500).send({
            'status':'error',
            'message':'Buku gagal ditambahkan'
        })
    }
})

// Update Book Collection
app.put('/books/:bookId',function(req,res){
    console.log("Update API")
    let new_data = req.body
    let book_id = req.params.bookId
    let book_found = data.find(x => x.id == book_id)
    let book_index = data.findIndex(x => x.id == book_id)
    let finishedStatus = false
    let updatedAt = new Date().toISOString()
    try{
        if(typeof book_found == "undefined"){
            res.status(404).send({
                "status":"fail",
                "message":"Gagal memperbarui buku. Id tidak ditemukan"
            })
        }
        else if(typeof new_data.name == "undefined"){
            res.status(400).send({
                'status':'fail',
                'message':'Gagal memperbarui buku. Mohon isi nama buku'    
            })
        }
        else if(new_data.readPage > new_data.pageCount){
            res.status(400).send({
                'status':'fail',
                'message':'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            })
        }
        else {
            if(new_data.readPage == new_data.pageCount){
                finishedStatus = true
            }
            book_found['name'] = new_data.name
            book_found['year'] = new_data.year
            book_found['author'] = new_data.author
            book_found['summary'] = new_data.summary
            book_found['publisher'] = new_data.publisher
            book_found['pageCount'] = new_data.pageCount
            book_found['readPage'] = new_data.readPage
            book_found['reading'] = new_data.reading
            book_found['updatedAt'] = updatedAt
            book_found['finished'] = finishedStatus
            data[book_index] = book_found
            res.send({
                'status':'success',
                'message':'Buku berhasil diperbarui'   
            })
        }
    }
    catch(err){
        res.status(500).send({
            'status':'error',
            'message':'Buku gagal diperbarui'
        })
    }
})

// Delete book in Book Collection
app.delete('/books/:bookId',function(req,res){
    let book_id = req.params.bookId
    let book_index = data.findIndex(x => x.id == book_id)
    console.log("Delete API")
    try {
        if(book_index == -1){
        res.status(404).send({
            'status':'fail',
            'message':'Buku gagal dihapus. Id tidak ditemukan'
            })
        } else {
            data.splice(book_index,1)
            res.send({
                'status':'success',
                'message':'Buku berhasil dihapus'   
        })
        }
    }
    catch(err){
        res.status(500).send({
            'status':'error',
            'message':'Buku gagal dihapus'
        })
    }
})

app.listen(PORT,()=>console.log(`The server is running on http://localhost:${PORT}`))

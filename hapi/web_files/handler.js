let data = require("./data.js");

const getAllBooks = (request, h) => {
    console.log(`All Books API | ${new Date().toString()}`);
    let requestQuery = request.query;
    let book_name = requestQuery.name || null;
    let book_reading_status = requestQuery.reading || null;
    let book_finished_status = requestQuery.finished || null;
    let all_book = [];
    try{
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
        const response = h.response({
                                    "status": "success",
                                    "data": { "books": all_book}
                                    });
        response.code(200);
        response.header("Content-Type", "application/json");
        return response;
    }
    catch(err){
        const response = h.response({
                                    "status": "error",
                                    "message": err.message
                                    });
        response.code(500);
        response.header("Content-Type", "application/json");
        return response;
    }
};

const getBookById = (req,h) => {
    console.log(`Specific Book API | ${new Date().toString()}`);
    try{
        let book_id = req.params.bookId;
        let book_found = data.find(x => x.id == book_id);
        if(typeof book_found == "undefined"){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Buku tidak ditemukan"
                                    });
            response.code(404);
            response.header("Content-Type", "application/json");
            return response;
        }
        else {
            const response = h.response({
                                    "status": "success",
                                    "data": {
                                        "book": book_found
                                    }
                                    });
            response.code(200);
            response.header("Content-Type", "application/json");
            return response;}
        } catch(err){
        const response = h.response({
                                    "status": "error",
                                    "message": err.message
                                    });
        response.code(500);
        response.header("Content-Type", "application/json");
        return response;
    }
};

const createNewBook = (req,h) => {
    console.log(`Create Book API | ${new Date().toString()}`);
    let insertedAt = new Date().toISOString();
    let updatedAt = insertedAt;
    let bodyRequest = req.payload;
    let uuid = bodyRequest.id || null;
    let finishedStatus = false;
    try {
        if(typeof bodyRequest.name == "undefined"){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Gagal menambahkan buku. Mohon isi nama buku"
                                    });
            response.code(400);
            response.header("Content-Type", "application/json");
            return response;
        }
        else if(bodyRequest.name == "" || bodyRequest.name === null){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Gagal menambahkan buku. Mohon isi nama buku"
                                    });
            response.code(400);
            response.header("Content-Type", "application/json");
            return response;
        }
        else if(bodyRequest.readPage > bodyRequest.pageCount){
            const response = h.response({
                                    "status": "fail",
                                    "message": "readPage tidak boleh lebih besar dari pageCount"
                                    });
            response.code(400);
            response.header("Content-Type", "application/json");
            return response;
        }
        else {
            if(bodyRequest.readPage == bodyRequest.pageCount){
                finishedStatus = true;
            }
            if(!uuid){
                uuid = Math.random().toString(36).substr(2, 20);
            }
            let book = {...bodyRequest, id:uuid, insertedAt:insertedAt , updatedAt:updatedAt, 
                    finished:finishedStatus
                };
            data.push(book);
            const response = h.response({
                                    "status": "success",
                                    "message": "Buku berhasil ditambahkan",
                                    "data": {
                                        "bookId":uuid
                                    }
                                    });
            response.code(201);
            response.header("Content-Type", "application/json");
            return response;
        } 
    }
    catch(err){
        const response = h.response({
                                    "status": "error",
                                    "message": "Buku gagal ditambahkan"
                                    });
        response.code(500);
        response.header("Content-Type", "application/json");
        return response;
    }
};

const updateBookById = (req,h) => {
    console.log(`Update Book API | ${new Date().toString()}`);
    let new_data = req.payload;
    let book_id = req.params.bookId;
    let book_found = data.find(x => x.id == book_id);
    let book_index = data.findIndex(x => x.id == book_id);
    let finishedStatus = false;
    let updatedAt = new Date().toISOString();
    try{
        if(typeof book_found == "undefined"){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Gagal memperbarui buku. Id tidak ditemukan"
                                    });
            response.code(404);
            response.header("Content-Type", "application/json");
            return response;
        }
        else if(typeof new_data.name == "undefined"){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Gagal memperbarui buku. Mohon isi nama buku"
                                    });
            response.code(400);
            response.header("Content-Type", "application/json");
            return response;
        }
        else if(new_data.readPage > new_data.pageCount){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
                                    });
            response.code(400);
            response.header("Content-Type", "application/json");
            return response;
        }
        else {
            if(new_data.readPage == new_data.pageCount){
                finishedStatus = true;
            }
            book_found["name"] = new_data.name;
            book_found["year"] = new_data.year;
            book_found["author"] = new_data.author;
            book_found["summary"] = new_data.summary;
            book_found["publisher"] = new_data.publisher;
            book_found["pageCount"] = new_data.pageCount;
            book_found["readPage"] = new_data.readPage;
            book_found["reading"] = new_data.reading;
            book_found["updatedAt"] = updatedAt;
            book_found["finished"] = finishedStatus;
            data[book_index] = book_found;
            const response = h.response({
                                    "status": "success",
                                    "message": "Buku berhasil diperbarui."
                                    });
            response.code(200);
            response.header("Content-Type", "application/json");
            return response;
        }
    }
    catch(err){
        const response = h.response({
                                    "status": "error",
                                    "message": "Buku gagal diperbarui."
                                    });
        response.code(500);
        response.header("Content-Type", "application/json");
        return response;
    }
};

const deleteBookById = (req,h) => {
    console.log(`Delete Book API | ${new Date().toString()}`);
    let book_id = req.params.bookId;
    let book_index = data.findIndex(x => x.id == book_id);
    try {
        if(book_index == -1){
            const response = h.response({
                                    "status": "fail",
                                    "message": "Buku gagal dihapus. Id tidak ditemukan"
                                    });
            response.code(404);
            response.header("Content-Type", "application/json");
            return response;
        } else {
            data.splice(book_index,1);
            const response = h.response({
                                    "status": "success",
                                    "message": "Buku berhasil dihapus."
                                    });
            response.code(500);
            response.header("Content-Type", "application/json");
            return response;
        }
    }
    catch(err){
        const response = h.response({
                                    "status": "error",
                                    "message": "Buku gagal dihapus."
                                    });
        response.code(500);
        response.header("Content-Type", "application/json");
        return response;
    }
};
module.exports = {getAllBooks, getBookById, createNewBook, updateBookById, deleteBookById};
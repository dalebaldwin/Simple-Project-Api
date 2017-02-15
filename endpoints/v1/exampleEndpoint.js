const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID

router.get('/', function (req, res) {
    res.send("Custom End Point Example")
})

// Example CRUD Routes

router.post('/:collection', function (req, res) {
    let data = req.body
    let collectionId = req.params.collection
    req.db.collection(collectionId).insert(data)
    res.send('Document Created ')
})

router.get('/read/:collection/:id', function (req, res) {
    let documentId = req.params.id
    let collectionId = req.params.collection
    req.db.collection(collectionId).find({ "_id": new ObjectId(documentId) }).toArray(function (error, documents) {
        if (documents.length === 0) {
            res.send('noResult')
        } else {
            res.send(documents[0])
        }
    })
})

router.put('/:collection/:id', function (req, res) {
    let documentId = req.params.id
    let collectionId = req.params.collection
    req.db.collection(collectionId).find({ "_id": new ObjectId(documentId) }).toArray(function (error, documents) {
        if (documents.length === 0) {
            res.send('No document found to edit')
        } else {
            req.db.collection(collectionId).update({ "_id": new ObjectId(documentId) }, { $set: req.body });
            res.send('Document Updated')
        }
    })
})

router.delete('/:collection/:id', function (req, res) {
    let documentId = req.params.id
    let collectionId = req.params.collection
    req.db.collection(collectionId).find({ "_id": new ObjectId(documentId) }).toArray(function (error, documents) {
        if (documents.length === 0) {
            console.log(error)
            res.send('Nothing to remove')
        } else {
            req.db.collection(collectionId).remove({ "_id": new ObjectId(documentId) })
            res.send('Document Removed')
        }
    })
})

// Simple query route

// Get /query/collectionName?page=[Page Number]&limit=[Number of items to return]

router.get('/query/:collection', function (req, res) {
    let collectionId = req.params.collection
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    req.db.collection(collectionId).find().skip(page * limit).limit(limit).sort({ "_id": -1 }).toArray(function(error, documents){
        if (documents.length === 0) {
            res.send('noResult');
        } else {
            res.send(documents);
        }
    })
})


module.exports = router;
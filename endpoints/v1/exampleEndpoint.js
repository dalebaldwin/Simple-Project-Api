const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID

router.get('/', function (req, res) {
    res.send("Custom End Point Example")
})

// Example CRUD Routes

router.post('/:collection', function (req, res) {
    var data = req.body
    var collectionId = req.params.collection
    req.db.collection(collectionId).insert(data)
    res.send('Document Created ')
})

router.get('/:collection/:id', function (req, res) {
    var documentId = req.params.id
    var collectionId = req.params.collection
    req.db.collection(collectionId).find({ "_id": new ObjectId(documentId) }).toArray(function (error, documents) {
        if (documents.length === 0) {
            res.send('noResult')
        } else {
            res.send(documents[0])
        }
    })
})

router.put('/:collection/:id', function (req, res) {
    var documentId = req.params.id
    var collectionId = req.params.collection
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
    var documentId = req.params.id
    var collectionId = req.params.collection
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

module.exports = router;
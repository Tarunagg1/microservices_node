'use srict'
require('dotenv').config();
const elasticsearch = require('elasticsearch');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());



const client = new elasticsearch.Client({
    host: process.env.ELASTIC_URL,
    requestTimeout: 6 * 350 * 2500,
    requestTimeout: Infinity,
    keepAlive: false
})


client.ping({}, async (err) => {
    if (err) {
        console.log('unablle to coonnected', err);
    } else {
        console.log('elasticsearch connected');
        // const index = await createIndex("searchs")
        // const mapping = await client.indices.putMapping({
        //     index: "searchs",
        //     body: {
        //         properties: {
        //             stext: {
        //                 type: "text"
        //             },
        //             sage: {
        //                 type: "integer"
        //             }
        //         }
        //     },
        //     includeTypeName: true,
        //     type: "search"
        // })
    }
})


const createIndex = async (indexName) => {
    try {
        const indexExists = await client.indices.exists({
            index: indexName
        })
        if (!indexExists) {
            const index = await client.indices.create({
                index: indexName
            })
        } else {
            console.log('index already exists');
        }
    } catch (error) {
        console.log('unable to create index', error);
    }
}


const searchData = async (searchValue) => {
    try {
        const { hits } = await client.search({
            index: "searchs",
            type: "search",
            body: {
                query: {
                    match: {
                        stext: searchValue
                    }
                }
            }
        })
        console.log('hits', hits);
    } catch (error) {
        console.log('unable to create index', error);
    }
}


const getIndicesData = async (req, res) => {
    try {
        const { hits } = await client.search({
            index: req.params['index'],
            type: req.params['stype'],
            body: {
                "from": 0, "size": 1000,
                query: {
                    match_all: {}
                }
            }
        })
        return res.status(200).json(hits);
    } catch (error) {
        return res.status(400).json(error);
    }
}



const getSingleIndicesData = async (req, res) => {
    try {
        const { hits } = await client.search({
            index: req.params['index'],
            body: {
                query: {
                    match: { "sage": req.params['sage'] }
                }
            }
        })
        return res.status(200).json(hits);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const insertIntoIndices = async (req, res) => {
    try {
        const hits = await client.index({
            index: req.params['index'],
            type: req.params['stype'],
            body: {
                stext: req.body.stext,
                sage: req.body.sage
            }
        })
        console.log(hits);
        return res.status(200).json(hits);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

const updateIntoIndices = async (req, res) => {
    try {
        const hits = await client.update({
            index: req.params['index'],
            type: req.params['stype'],
            id: req.body['_id'],
            body: {
                doc: {
                    stext: req.body.stext,
                    sage: req.body.sage
                }
            }
        })
        console.log(hits);
        return res.status(200).json(hits);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

const deleteIntoIndices = async (req, res) => {
    console.log('oj');
    try {
        const hits = await client.deleteByQuery({
            index: req.params['index'],
            type: req.params['stype'],
            body: {
                query: {
                    match: { _id: req.body['_id'] }
                }
            }
        })
        console.log(hits);
        return res.status(200).json(hits);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

const deleteIndices = async (req, res) => {
    try {
        const hits = await client.indices.delete({
            index: req.params['index'],
        })
        console.log(hits);
        return res.status(200).json(hits);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}




//// rest api
app.get('/', function (req, res) {
    return res.status(200).send("welcome to  elasticsearch crud")
})

// get all data
app.get('/getdata/:sindex/:index', function (req, res) {
    getIndicesData(req, res);
})

// get single data
app.get('/getdata/:stype/:index/:sage', function (req, res) {
    getSingleIndicesData(req, res);
})

// insert single data into indices
app.post('/student/:stype/:index', function (req, res) {
    insertIntoIndices(req, res);
})


// update single data into indices
app.put('/student/:stype/:index', function (req, res) {
    updateIntoIndices(req, res);
})


// delete single data into indices
app.delete('/student/:stype/:index', function (req, res) {
    deleteIntoIndices(req, res);
})

// delete the indices
app.delete('/deleteindices/:index', function (req, res) {
    deleteIndices(req, res);
})







const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log('server listning at port ' + PORT);
})



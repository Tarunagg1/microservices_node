const elasticsearch = require('elasticsearch');
const config = require('config');
const moment = require('moment');
const mongoClient = require('mongodb').MongoClient;

const url = config.mongodb.url + config.mongodb.localserver + config.mongodb.port;


const elasticsearchClient = new elasticsearch.Client({
    host: config.elasticsearch.url + "" + config.elasticsearch.port,
    requestTimeout: 6 * 350 * 2500,
    requestTimeout: Infinity,
    keepAlive: false
})

let itemQue = [];
let limitData = 1000;
let offset = 0;
let prev = 0;
let index = 1;


function bulkop(data, callback) {
    elasticsearchClient.bulk({
        body: data
    }, (err, result) => {
        if (callback)
            callback(err, result);
    })
    data = [];
}

Date.prototype.yyyymmdd = function () {
    let yyyy = this.getFullYear().toString();
    let mm = this.getMonth().toString();
    let dd = this.getDate().toString();
    return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]);
}


const indexMoongodbData = (esIndexName, esIndexType, collectionName) => {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log("Sorry unable to connect to mongodb Error: ", err);
        } else {
            const db = client.db(config.mongodb.databaseName);
            const collection = db.collection(collectionName);
            // commands
            collection.find({}).skip(offset).limit(limitData).sort({ _id: -1 }).toArray((err, result) => {
                if (result.length > 0) {
                    process.nextTick(function () {
                        result.forEach(element => {
                            for (prop in element) {
                                if (typeof element[prop] === 'object') {
                                    if (prop.indexOf('_DATE') != -1) {
                                        var m = moment(new Date(element[prop]).yyyymmdd(), ['MM/DD/YYYY', 'YYYY/MM/DD', 'DD/MM/YYYY']);
                                        if (m.isValid()) {
                                            element[prop] = m;
                                        }
                                        else {
                                            delete element[prop];
                                        }
                                    }
                                }
                            }
                            if (element._id) {
                                itemQue.push({
                                    index: {
                                        _index: esIndexName,
                                        _type: esIndexType,
                                        _id: element._id
                                    }
                                });
                                delete element._id;
                            } else {
                                itemQue.push({
                                    index: {
                                        _index: esIndexName,
                                        _type: esIndexType,
                                        _id: index
                                    }
                                });
                            }
                            itemQue.push(JSON.stringify(element));
                            index++;
                        });

                        if (itemQue.length > 0) {
                            bulkop(itemQue, (err, result) => {
                                prev = offset;
                                offset += limitData;
                                console.log('Previous offset: ' + prev + ' new offset: ' + offset);
                                if (err) {
                                    console.log(err);
                                }
                                else if (result) {
                                    console.log('Data item added successfully', result.items.length);
                                    indexMoongodbData(esIndexName, esIndexType, collectionName);
                                }
                            }) // end of bulk
                        } else {
                            process.exit();
                        }
                    }); // process nexttick
                } // end of result length
                else {
                    console.log('All data successfully imported into elasticsearch');
                    process.exit();
                }
            }); // end of collection find

        }
    })
}




function deleteMapping(esIndexName) {
    elasticsearchClient.indices.delete({
        index: esIndexName
    }, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Deleted index: ", esIndexName);
        }
    })
}


module.exports = { indexMoongodbData, deleteMapping };
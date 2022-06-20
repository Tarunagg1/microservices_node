const indexer = require('./indexer');
const config = require('config');

const indexName = config.elasticsearch.elasticsearcherIndices.COMPANY.index;
const indexType = config.elasticsearch.elasticsearcherIndices.COMPANY.type;
const tableName = config.elasticsearch.elasticsearcherIndices.COMPANY.collectionName;

indexer.indexMoongodbData(indexName, indexType, "lists");

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


module.exports = {
    connectionString:connecttionSettings,
    helloQueueName:"hello",
    task_Queue_Name:"task",
    log_Queue_Name:"pub_sub_exchange_fanout_log",
    direct_routing_binding_Queue_Name:"direct_routing_binding_Queue_Name",
    topic_exchnage:"topic_exchnage",
    header_exchnage:"header_exchnage",
}
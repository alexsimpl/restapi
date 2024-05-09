const express = require('express')
const bp = require('body-parser')
const app = express()
const port = 8888
const host = "192.168.20.38"
// const host = "127.0.0.1"
// const sys = "123"
// const pass = "456"
// const key = "123456789101"

app.use(bp.raw({type: 'application/octet-stream'}))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/', (req, res) => {
    //console.log(req);
    // console.log("---Incoming request---");
    const msg_json = req.body;
    console.log(msg_json);
    res.status(200);
    res.type('application/json');   
    //console.log(msg_json.messages[0]);
    const date = new Date();
    const date_answer = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.toLocaleTimeString('ru-RU');
    console.log(date_answer);
    const operation = msg_json.messages[0].operation;
    // if (msg_json.messages[1].operation != undefined) {
    //     const operation1 = msg_json.messages[1].operation;
    // }
    // const operation1 = msg_json.messages[1].operation;
    const id = msg_json.messages[0].id;
    id_answer = Date.now();
    const mode = msg_json.messages[0].mode;
    is_active = msg_json.messages[0].active;
    msg_length = req.headers['content-length'];
    // console.log(msg_length);
    if (msg_length > 2000) {
        res.send.status(400);
        res.send("Bad Request")
    }
    const sn = msg_json.sn;
    const type = msg_json.type;
    if (operation == null) {
        if (msg_json.success == 1) {
            console.log("Ответ с id = ", id, " от контроллера sn = ", sn);
        }
        else {
            if (!msg_json.messages[1].operation){
            console.log("Неизвестный ответ", msg_json);
            }
            else if (msg_json.messages[1].operation == "events") {
                console.log("Контроллер ", sn, " готов к работе и находится в режиме выдачи событий");
                console.log(req.body.messages[1].events);
                // res.send(
                //     { 
                //         "date": date_answer,
                //         "interval": 10,
                //         "messages":
                //         [
                //             {
                //                 "id": 2000,
                //                 "operation": "open_door",
                //                 "direction": 1
                //             }
                //         ]
                //     }
                //     )
                    // res.send(
                    //     { 
                    //         "date": date_answer,
                    //         "interval": 10,
                    //         "messages":
                    //         [
                    //             {
                    //                 "id": 2500,
                    //                 "operation": "add_cards",
                    //                 "cards": [
                    //                     {
                    //                         "card": "00B5009EC1A8",
                    //                         "flags": 0,
                    //                         "tz": 255
                    //                         },
                    //                         {
                    //                         "card": "0000000FE32A2",
                    //                         "flags": 32,
                    //                         "tz": 255
                    //                         }                                          
                    //                 ]
                    //             }
                    //         ]
                    //     }
                    //     )
                        // res.send(
                        //     { 
                        //         "date": date_answer,
                        //         "interval": 10,
                        //         "messages":
                        //         [
                        //             {
                        //                 "id": 2700,
                        //                 "operation": "read_cards"
                        //             }
                        //         ]
                        //     }
                        //     )
                res.send(
                            { 
                                "date": date_answer,
                                "interval": 10,
                                "messages":
                                [
                                    {
                                        "id": id,
                                        "operation": "events",
                                        "events_success": 10
                                    }
                                ]
                            }
                            )
            }
            else if (msg_json.messages[1] || msg_json.messages[0]) {
                // if (msg_json.messages[1].operation == 'ping' && id != id_answer)  
                if (msg_json.messages[1].operation == 'ping' || msg_json.messages[0].operation == 'ping') 
                {
                console.log("Controller is ping mode!");
                //console.log("Список событий ", msg_json.events);
                console.log('id_answer is ', id_answer);
                res.send(
                    { 
                        "id": id_answer,
                        "date": date_answer,
                        "interval": 10,
                        "messages":
                        [
                            
                            // {"id": id}
                            // {
                            //     "id": id,
                            //     "operation": "set_active",
                            //     "active": 1,
                            // }
                        ]
                    }
                )
                // res.send(
                //                 { 
                //                     "date": date_answer,
                //                     "interval": 10,
                //                     "messages":
                //                     [
                //                         {
                //                             "id": id_answer,
                //                             "operation": "add_cards",
                //                             "cards": [
                //                                 {
                //                                     "card": "00B5009EC2A8",
                //                                     "flags": 0,
                //                                     "tz": 255
                //                                     },
                //                                     {
                //                                     "card": "0000000F432A2",
                //                                     "flags": 0,
                //                                     "tz": 255
                //                                     }                                          
                //                             ]
                //                         }
                //                     ]
                //                 }
                //                 )
                // res.send(
                //             { 
                //                 "date": date_answer,
                //                 "interval": 10,
                //                 "messages":
                //                 [
                //                     {
                //                         "id": id_answer,
                //                         "operation": "open_door",
                //                         "direction": 1
                //                     }
                //                 ]
                //             }
                //             )
                // res.send(
                    // { 
                    //     "date": date_answer,
                    //     "interval": 10,
                    //     "messages":
                    //     [
                    //         {
                    //             "id": 2100,
                    //             "operation": "read_cards"
                    //         }
                    //     ]
                    // }
                    // )
            }
        }
        else if (msg_json.messages[1]) {
            if (msg_json.messages[1].operation == "check_access")  {
            console.log('Controller check cards!');
            if (msg_json.messages[1].card == "0000007CFAB0") {
                console.log("Access success!");
                res.send(
                { 
                    "date": date_answer,
                    "interval": 10,
                    "messages":
                    [
                        {
                            "id": id,
                            "operation": "check_access",
                            "granded": 1
                        }
                    ]
                }
                )
            }
        }
    }
        }
    }
    else if (operation == 'power_on') {
        console.log("Контроллер ", type, "с серийным номером ", sn, " включился");
        res.send(
        { 
            "date": date_answer,
            "interval": 10,
            "messages":
            [
                {
                    "id": id,
                    "operation": "set_active",
                    "active": 1,
                    "online": 0
                }
            ]
        }
        )
    }
    
})

 
app.get('*', (req, res) => {
    //console.log(req.body);
    //console.log(req.body, res.body);
})

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})
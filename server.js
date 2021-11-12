const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require("cors");


/*
* RUTAS
*/
const usuarios = require('./routes/usuariosRoutes');
const reserva = require('./routes/reservaRoutes');
const actividad = require("./routes/actividadRoutes");
const guia= require('./routes/guiaRoutes');

const port = process.env.port || 3000;

//app.use(logger('dev'));
app.use(logger('dev'))
app.use( express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port', port);


/*
*LLAMADO DE RUTAS
*/

usuarios(app);
reserva(app);
actividad(app);
guia(app);

server.listen(3000, '192.168.0.14' || 'localhost', function() {
    console.log('Aplicacion nodejs'  +  process.pid + ' Iniciada ...')
});


//Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports = {
    app: app,
    server: server
}






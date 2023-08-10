const { exec } = require('child_process');
const httpServer = require('http-server');

const htmlFilePath = './oculosemoculos.html';

const server = httpServer.createServer();
server.listen(0, 'localhost', () => {
    const serverPort = server.server.address().port;
    console.log(`Server Started on ${serverPort} port`);

    exec(`start http://localhost:${serverPort}/${htmlFilePath}`);
    console.log('Final Exec')
});

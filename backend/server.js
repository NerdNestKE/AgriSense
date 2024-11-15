// Import the http module
const http = require('http');

const fs = require('fs').promises;

// Define the port to listen on
const port = 3000;

// Create the server
const server = http.createServer(async (req, res) => {

if (req.url ==='/') {
    try {
        const data = await fs.readFile('index.html','utf8');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    }catch(err) {
        res.writeHide(500, {'Content-Type' : 'text/html'});
        res.end('Internal Server Error')
    }
}else {
    res.writeHead(404, {'Content-Type' : 'text/plain' } );
    res.end('Not Found');
}

});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);

}
)

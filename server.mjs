import http from "http";
import { parse } from "url";

const server = http.createServer((req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    // 🔹 Manejo de preflight (OPTIONS)
    if (req.method === "OPTIONS") {
        res.writeHead(200, headers);
        return res.end();
    }

    // 🔹 1. Path Params → /sumar/5/10
    if (req.method === "GET" && req.url.startsWith("/sumar/")) {
        const parts = req.url.split("/");
        if (parts.length === 4) {
            const num1 = Number(parts[2]);
            const num2 = Number(parts[3]);
            res.writeHead(200, headers);
            return res.end(JSON.stringify({ resultado: num1 + num2 }));
        }
    }

    // 🔹 2. Query Params → /sumar?num1=5&num2=10
    if (req.method === "GET" && req.url.startsWith("/sumar?")) {
        const query = parse(req.url, true).query;
        const num1 = Number(query.num1);
        const num2 = Number(query.num2);
        res.writeHead(200, headers);
        return res.end(JSON.stringify({ resultado: num1 + num2 }));
    }

    // 🔹 3. Body Params → POST /sumar
    if (req.method === "POST" && req.url === "/sumar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                const num1 = Number(data.num1);
                const num2 = Number(data.num2);
                res.writeHead(200, headers);
                res.end(JSON.stringify({ resultado: num1 + num2 }));
            } catch (error) {
                res.writeHead(400, headers);
                res.end(JSON.stringify({ error: "JSON inválido" }));
            }
        });
        return;
    }

    // 🔹 Ruta no encontrada
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});

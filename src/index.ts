import 'tsconfig-paths/register';

import fs from 'node:fs'
import path from 'path'

import express, { Request, Response } from 'express';

import * as entity_services from './services/entities';
import * as bank_services from './services/bank';

const app = express()
const PORT = 4096
const VERSION = 0

app.get('/base/*', (req, res) => {
    if (req.ip != '127.0.0.1' && req.ip != '::1') {
        res.status(401).json('Unauthorized')
        console.warn(`Tentative d'accès à ${req.path} depuis ${req.ip}`)
        return
    }

    const filename = req.params[0];
    const filePath = path.join(__dirname, 'ressources', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.send(data);
    });
});

app.get('/ping', (req: Request, res: Response) => {
    const body = req.body

    if (!body._VER || body._VER != VERSION) {
        res.status(299).json('WrongVersion')
    } else {
        res.status(200).json('Pong')
    }
});

app.get('/user/:id', entity_services.fetch_user)

app.post('/bank/activate', bank_services.activateBank)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
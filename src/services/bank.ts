import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

import { verifyToken } from '@/utils';
import { NSID } from '@/models/global';

import { _bank, getBank } from '@/models/economy';


const activateBank = (req: Request, res: Response) => {
    const headers = req.headers
    const body = req.body

    const token: object = verifyToken(headers.authorization)

    if (!token) {
        res.status(401).json({"message": "InvalidOrInexistingCredentials"})
    } else {
        let bank: _bank = getBank(new NSID(token["author"]))

        if (bank.activated) {
            res.status(403).json({"message": "BankAlreadyActivated"})
        } else {
            let new_token = randomUUID().toString()
            res.status(200).json({"token": new_token})
        }
    }
}

export { activateBank }
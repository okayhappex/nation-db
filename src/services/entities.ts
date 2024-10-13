import { Request, Response } from 'express';
import { verifyToken } from '@/utils';
import { NSID } from '@/models/global';
import { _user, User } from '@/models/entities';
import { _get_user } from '@/functions/entities';

const fetch_user = async (req: Request, res: Response) => {
    const headers = req.headers;

    const token: object | null = await verifyToken(headers.authorization);

    if (!token) {
        res.status(401).json({ "message": "InvalidOrInexistingCredentials" });
        return;
    }

    let author: User | null = await _get_user(new NSID(token["author"]));

    if (!author || !author.permissions.Entities.access.includes('r')) {
        res.status(403).json({ "message": "Forbidden" });
        return;
    }

    let user: User | null = await _get_user(new NSID(req.params.id.toUpperCase()));

    if (!user) {
        res.status(404).json({ "message": "User not found" });
        return;
    }

    let _res: _user = {
        id: user.id.value,
        name: user.name,
        register_date: user.registerDate,
        legal_position: user.position.id,
        xp: user.xp,
        boost: user.boost,
        additional: user.additional,
        permissions: [
            user.permissions.Archives.access,
            user.permissions.BankAccounts.access,
            user.permissions.Entities.access,
            user.permissions.Groups.access,
            user.permissions.Marketplace.access,
            user.permissions.Laws.access,
            user.permissions.OfficialDisplayWays.access,
            user.permissions.Reports.access,
            user.permissions.Transactions.access,
            user.permissions.Votes.access
        ]
    };

    res.status(200).json(_res);
}

export { fetch_user };
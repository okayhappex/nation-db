import { permissions, UserPermissions } from '@/models/access/nation';
import { Position } from '@/models/global';

const _get_position = async (id: string): Promise<Position | null> => {
    let position: Position = new Position(id);

    try {
        const response = await fetch('http://localhost:4096/base/entities/positions.json');
        const data = await response.json();

        let _pos = data[id];

        if (!_pos) {
            return null;
        }

        console.log(_pos);

        position.title = _pos["name"];
        position.allow_permissions.from_array(_pos["permissions"]);
    } catch (error) {
        console.error("Error fetching position data:", error);
        return null;
    }

    return position;
}

const _merge_permissions = (main: UserPermissions, branch: UserPermissions): UserPermissions => {
    let order: Array<Array<permissions>> = [
        [main.Archives, branch.Archives],
        [main.BankAccounts, branch.Archives],
        [main.Entities, branch.Archives],
        [main.Groups, branch.Archives],
        [main.Marketplace, branch.Archives],
        [main.Laws, branch.Archives],
        [main.OfficialDisplayWays, branch.Archives],
        [main.Reports, branch.Reports],
        [main.Transactions, branch.Transactions],
        [main.Votes, branch.Votes]
    ];

    let _main: permissions;
    let _branch: permissions;

    for (let p = 0; p < order.length; p++) {
        _main = order[p][0];
        _branch = order[p][1];

        for (let i = 0; i < 4; i++) {
            if (_main[i] === '-' && _branch[i] !== '-') {
                _main[i] = _branch[i];
            }
        }
    }

    return main;
}

export { _get_position, _merge_permissions };
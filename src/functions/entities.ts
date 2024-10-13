import { NSID } from '@/models/global';
import { _user, User } from '@/models/entities';
import { _merge_permissions, _get_position } from '@/functions/global';
import { UserPermissions } from '@/models/access/nation';

const _get_user = async (id: NSID): Promise<User | null> => {
    let user: User = new User(id, 'Entité Inconnue');

    try {
        const res = await fetch('http://localhost:4096/base/entities/members.json');
        const data = await res.json();

        let _entity: _user;
        _entity = data[id.value.toUpperCase()];

        if (!_entity) {
            console.log(data);
            console.log(id.value.toUpperCase());
            return null;
        }

        console.log(_entity);

        user.name = _entity.name;
        user.registerDate = _entity.register_date;
        user.position = await _get_position(_entity.legal_position);
        user.xp = _entity.xp;
        user.boost = _entity.boost;
        user.additional = _entity.additional;

        if (!user.position) {
            user.position = await _get_position('citoyen')
        }

        user.permissions = _merge_permissions(
            (await _get_position('citoyen')).allow_permissions,
            user.position.allow_permissions
        );

        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export { _get_user };
import { UserPermissions } from '@/models/access/nation'

class NSID {
    value: string;

    constructor(value: NSID | string | number) {
        if (typeof value === 'string') {
            this.value = value.toUpperCase();
        } else if (typeof value === 'number' && Number.isInteger(value)) {
            this.value = value.toString(16).toUpperCase();
        } else if (value instanceof NSID) {
            this.value = value.value;
        } else {
            throw new TypeError("Only NSID, strings and integers can be serialized");
        }
    }
}


class Position {
    id: string
    title: string
    allow_permissions: UserPermissions = new UserPermissions()

    constructor(title: string) {
        this.title = title
        this.id = title.toLowerCase().replace(' ', '')
    }
}

export { NSID, Position }
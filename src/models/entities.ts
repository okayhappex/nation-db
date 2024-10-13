import { NSID, Position } from '@/models/global'
import { UserPermissions } from '@/models/access/nation'

interface _user {
    id: string,
    name: string,
    register_date: number,
    legal_position: string,
    additional: object,
    xp: number,
    boost: object,
    permissions: Array<string>
}

class User {
    id: NSID
    name: string
    registerDate: number = new Date().getTime() / 1000
    position: Position = new Position('membre')
    additional: object = {}
    permissions: UserPermissions = new UserPermissions()

    xp: number = 0
    boost: object = {}

    constructor(id: NSID, name: string) {
        this.id = id
        this.name = name
    }
}

export { _user, User }
interface permissions {
    name: string,
    id: number,
    access: string
}

class UserPermissions {
    /*
        w = write / add
        r = read
        m = modify / accept / unlock
        d = delete / cancel / lock

        Ressources written by the request author always return WRDM except votes, archives, laws and transactions.
    */

    Archives: permissions = {'name': 'Archives', 'id': 0, 'access': '-r--'} // Gérer les archives
    BankAccounts: permissions = {'name': 'Bank Accounts', 'id': 1, 'access': '----'} // Gérer les comptes en banque
    Entities: permissions = {'name': 'Entities', 'id': 2, 'access': '-r--'} // Gérer les membres
    Groups: permissions = {'name': 'Groups', 'id': 3, 'access': '-r--'} // Gérer les groupes
    Marketplace: permissions = {'name': 'Marketplace', 'id': 4, 'access': 'wr--'} // Interagir avec le marché
    Laws: permissions = {'name': 'Laws', 'id': 5, 'access': '-r--'} // Gérer les lois et la constitution
    OfficialDisplayWays: permissions = {'name': 'Official Channels', 'id': 6, 'access': '-r--'} // Gérer les flux d'informations officiels
    Reports: permissions = {'name': 'Reports', 'id': 7, 'access': 'w---'} // Gérer les plaintes
    Transactions: permissions = {'name': 'Transactions', 'id': 8, 'access': '----'} // Gérer les transactions
    Votes: permissions = {'name': 'Votes', 'id': 9, 'access': 'wr--'} // Gérer les élections

    from_array(data: Array<string>) {
        let order = [
            this.Archives,
            this.BankAccounts,
            this.Entities,
            this.Groups,
            this.Marketplace,
            this.Laws,
            this.OfficialDisplayWays,
            this.Reports,
            this.Transactions,
            this.Votes
        ]

        for (let p = 0; p < data.length; p++) {
            order[p].access = data[p]
        }
    }
}

export { permissions, UserPermissions }
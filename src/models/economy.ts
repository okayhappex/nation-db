import { NSID } from "./global"

interface _bank {
    name: string
    url: string
    owner: NSID
    activated: boolean
}

const getBank = (id: NSID): _bank => {
    fetch('$/entities/banks.json')
        .then(res => res.json())
        .then(data => {
            let bank: _bank = data[id.value]
            return bank
        })
    
    return
}

export { _bank, getBank }
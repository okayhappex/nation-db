if [ ! -d ressources ]; then
    mkdir ressources
    mkdir ressources/entities
    mkdir ressources/marketplace
    mkdir ressources/records
    mkdir ressources/records/archives
fi

# Entities
echo "{}" > ./ressources/entities/groups.json
echo "{}" > ./ressources/entities/members.json
echo "{}" > ./ressources/entities/positions.json

# Marketplace
echo "{}" > ./ressources/marketplace/items.json
echo "{}" > ./ressources/marketplace/services.json

# Records
echo "{}" > ./ressources/records/tokens.json
db.createUser({
    user: 'stamping_user',
    pwd: 'Passw0rd',
    roles: [
        {
            role: 'readWrite',
            db: "stampings"
        }
    ]
});
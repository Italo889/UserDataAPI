function validateUser(req, res, next) {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        res.status(400).send("Dados inválidos");
    } else {
        next();
    }
}

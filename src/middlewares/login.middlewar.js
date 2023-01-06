const verifyLogin = (req, res, next) => {
    const { email, password } = req.body;
    const regexpEmail = /^\S+[@]\w+[.]\S+$/gm;

    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

    if (!regexpEmail.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (password.length < 6) {
        return res.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
    next();
};

module.exports = {
    verifyLogin,
};
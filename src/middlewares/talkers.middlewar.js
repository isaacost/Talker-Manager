const verifyAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

    if (authorization.length !== 16 || typeof authorization !== 'string') {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
};

const verifyName = (req, res, next) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

const verifyAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'O campo "age" deve ser um numero inteiro' });
    } 
  
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    } 
  
    next();
};

const verifyTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

    next();
};

const verifyWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
  
    const regex = /\d{2}\/\d{2}\/\d{4}/gm;
  
    if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  
    if (!regex.test(watchedAt)) {
      return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    next();
  };

  const verifyRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
  
    if (rate === 0) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  
    if (typeof rate !== 'number') {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    } 
  
    next();
  };

  const verifyRate2 = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
  
    if (!Number.isInteger(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    if (rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

module.exports = {
    verifyAuth,
    verifyName,
    verifyAge,
    verifyTalk,
    verifyWatchedAt,
    verifyRate,
    verifyRate2,
};
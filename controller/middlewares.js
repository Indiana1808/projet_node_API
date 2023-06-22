exports.checkApikey = (req, res, next) => {
    const apiKeyReceived = req.headers['api-key'];
    const apikey = '8f94826adab8ffebbeadb4f9e161b2dc';
    console.log(req.headers);
    if (apiKeyReceived === apikey) {
        next();
    } else {
        res.status(401).json({ message: "Accès non autorisé! La clé API fournie ne correspond pas" });
    }
};

exports.isValidDate = (dateString) => {
    // Check if the dateString is a valid date format
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };
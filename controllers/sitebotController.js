const SiteBot = require('../models/sitebot');

exports.createSiteBot = async (req, res) => {
    const { name, baseUrl } = req.body;

    const sitebot = new SiteBot(name, baseUrl);
    await sitebot.save();

    res.status(201).json({ message: 'SiteBot created!', sitebot: sitebot });
}

exports.getSiteBot = async (req, res) => {
    const { token } = req.params;

    const sitebot = await SiteBot.findByToken(token);

    if (!sitebot) {
        return res.status(404).json({ message: 'SiteBot not found!' });
    }

    res.json({ sitebot: sitebot });
}

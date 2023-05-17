// const requestIp = require('request-ip');
// const geoip = require('geoip-lite');
// const geoip2 = require('geoip-country');

const checkIP = async (req, res) => {
    // const clientIp = requestIp.getClientIp(req);
    // const geo = geoip.lookup(clientIp);
    // const geo2 = geoip2.lookup(clientIp);
    res.status(200).json({
        header: req?.headers
    });
};

export default checkIP;

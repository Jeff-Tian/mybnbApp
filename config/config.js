var config = {
    local: {
        mode: 'local',
        port: 3001,
        version: '1.1.2'
    },
    staging: {
        mode: 'staging',
        port: '3001',
        version: '1.1.2'
    },
    prd: {
        mode: 'prd',
        port: process.env.PORT || 3001,
        version: '1.1.2'
    }
};

module.exports = (function (mode) {
    var theConfig = config[mode || process.argv[2] || 'local'] || config.local;

    theConfig.serviceUrls = {
        orders: {
            create: '/api/orders'
        }
    };

    return theConfig;
})();
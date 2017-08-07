exports.LOCAL = Object.assign({}, {
    api_url: "http://localhost:49887/",
    tokenRefreshInterval: 900000, // 15 min
    prodMode: false,
    dateFormat: 'YYYY-MM-DD HH:mm',
    tokenName: 'ex-token'
});

exports.DEV = Object.assign({}, {
    api_url: "https://sba-dev-api.azurewebsites.net",
    tokenRefreshInterval: 900000, // 15 min
    prodMode: true,
    dateFormat: 'YYYY-MM-DD HH:mm',
    tokenName: 'ex-token'
});

exports.TEST = Object.assign({}, {
    api_url: "https://sba-test-api.azurewebsites.net",
    tokenRefreshInterval: 900000, // 15 min
    prodMode: true,
    dateFormat: 'YYYY-MM-DD HH:mm',
    tokenName: 'ex-token'
});

exports.PROD = Object.assign({}, {
    api_url: "https://sba-prod-api.azurewebsites.net",
    tokenRefreshInterval: 900000, // 15 min
    prodMode: true,
    dateFormat: 'YYYY-MM-DD HH:mm',
    tokenName: 'ex-token'
});
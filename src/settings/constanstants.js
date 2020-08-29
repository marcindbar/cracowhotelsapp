const API_URL_HOST = 'https://api.foursquare.com'
const API_URL_PATHNAME = '/v2/venues/explore'
const API_URL_PARAMS = {
    ll: '50.061703,19.937394',
    client_secret: 'ABOKXZIF3ZB3T2TXXSO1VENGN1Z2LVLERFWDE4RSQF0MWVXZ',
    categoryId: '4bf58dd8d48988d1fa931735',
    radius: '6000',
    limit: '120',
    client_id: 'U0GLS0ZVSGFMQD1YFNPWO054PKPNCDNUY1XT13XG1TNXKQZK',
    v: '20180819',
}

const API_URL = new URL(API_URL_HOST)
API_URL.pathname = API_URL_PATHNAME
API_URL.search = new URLSearchParams(API_URL_PARAMS).toString()

export {API_URL}

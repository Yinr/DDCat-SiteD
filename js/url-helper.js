/**
 * URL utils for DDCat
 *
 * @author Yinr
 * @version 0.0.1
 *
 */

/**
 * Filling related url with setting host
 *
 * @param {string} url URL to be filling
 * @param {string} host default host for filling
 * @param {string} [default_protocol=http] default protocol for filling
 * @returns {string} filled url
 */
function filling_url(url, host, default_protocol) {
    if (default_protocol === undefined) default_protocol = 'http:';
    host = host.replace(/\/$/, '');

    var u = decodeURI(url);

    if (u.indexOf("http") < 0) {
        if (u.substr(0, 2) == '//') {
            u = default_protocol + u;
        } else {
            if (u.substr(0, 1) == '/') u = host + u;
            else u = host + '/' + u;
        }
    }
    return encodeURI(u);
}

/**
 * Change url host
 *
 * @param {string} url original url
 * @param {string} host new host
 * @returns {string} url with new host
 */
function change_url_host(url, host) {
    host = host.replace(/^https?:\/\/[^\/]+/i, host);
    return url;
}

/**
 * Update utils for DDCat
 *
 * @author Yinr
 * @version 0.0.1
 *
 */

/**
 * Update Info API
 * More information on <https://github.com/Yinr/DDCat-SiteD>
 * - GET {UPDATE_API_URL}/all.json -> { updateTime: {timestamps}, data: plugin_info[] }
 * - GET {UPDATE_API_URL}/{plugin_id}.json -> {plugin_info}
 */

/**
 * @typedef {object} PluginInfo
 * @property {string} id plugin id
 * @property {number} version plugin version
 * @property {string} url download url
 * @property {string} site plugin site
 * @property {string} expr plugin site match patten
 * @property {string} [author] plugin author
 * @property {string} [logo] plugin logo
 * @property {string} [desc] plugin description
 * @property {string} [time] plugin update time, format: YYYY-MM-DD
 */

/**
 * @typedef {object} SitedUpdateItemForPlugin
 * @property {string} name entry name
 * @property {string} url entry url
 * @property {string} [author] entry item author
 * @property {string} [logo] image url
 * @property {string} [newSection] entry new section info
 * @property {string} [updateTime] entry update time, format: YYYY-MM-DD
 * @property {string} [id] plugin id
 * @property {number} [version] plugin version
 * @property {string} site plugin site
 * @property {string} expr plugin site match patten
 */

/**
 * Check and return DDCat update item with plugin update info
 *
 * @param {string} plugin_id plugin id
 * @param {number} plugin_version plugin version
 * @param {PluginInfo[]} update_infos plugins update infomation array
 * @return {SitedUpdateItemForPlugin|null} DDCat update item
 *
 * @example
 * ```
 * // Entry en main > home
 * // <updates title="更新" url="{UPDATE_API_URL}" parse="plugin_update_parse" />
 * function plugin_update_parse(url, html) {
 *     var list = [];
 *     var update_infos = JSON.parse(html);
 *     var update_item = get_update_item('plugin_id', plugin_version, update_infos);
 *     if (update_item) {
 *         print('插件 ' + update_item.id + ' 可以更新到 V' + update_item.version);
 *         list.push(update_item);
 *     }
 *     return JSON.stringify(list);
 * }
 * ```
 *
 */
function get_update_item(plugin_id, plugin_version, update_infos) {
    if (!plugin_id || plugin_version === undefined) return null;
    if (!update_infos || !(update_infos instanceof Array)) return null;

    var infos = update_infos.filter(function(item) { return item.id === plugin_id; });
    if (!infos || infos.length == 0) return null;
    var info = infos[0];
    if (!info.version || info.version <= plugin_version) return null;
    if (!info.url) {
        print('获取插件 ' + plugin_id + ' 更新信息出错!');
        return null;
    }

    var update_item = {
        name: "更新 " + plugin_id + '.V' + info.version.toString(),
        url: info.url.replace(/^https?:\/\//i, 'sited://'),
        author: info.author || '',
        logo: info.logo || '',
        newSection: info.desc || '',
        updateTime: info.time || '',
        /* additional info */
        id: info.id,
        version: info.version,
    }
    return update_item;
}

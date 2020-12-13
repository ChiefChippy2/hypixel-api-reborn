const GuildMember = require('./GuildMember');
const GuildRank = require('./GuildRank');
const Color = require('../Color');
const Game = require('../Game');
const getGuildLevel = require('../../utils/getGuildLevel');
/**
 * Guild class
 * @param {data} data Guild data
 */
class Guild {
  constructor (data) {
    /**
     * Guild ID
     * @readonly
     * @type {string}
     */
    this.id = data._id;
    /**
     * Guild name
     * @readonly
     * @type {String}
     */
    this.name = data.name;
    /**
     * Guild description
     * @readonly
     * @type {String}
     */
    this.description = data.description ? data.description : null;
    /**
     * Guild experience
     * @readonly
     * @type {Number}
     */
    this.experience = data.exp || 0;
    /**
     * Guild level
     * @readonly
     * @type {Number}
     */
    this.level = getGuildLevel(this.experience);
    /**
     * Guild members
     * @readonly
     * @type {Array<GuildMember>}
     */
    this.members = members(data);
    /**
     * Guild ranks
     * @readonly
     * @type {Array<GuildRank>}
     */
    this.ranks = ranks(data);
    /**
     * An array containing all guild ranks sorted by newest
     * @author linearaccelerator
     * @returns {Array<GuildRank>}
     */
    this.getRanksByNewest = function () {
      return this.ranks.length ? this.ranks.map(r => new GuildRank(r)).sort((a, b) => b.createdAt - a.createdAt) : null;
    };
    /**
     * A map containing all guild members, keyed by their uuids
     * @author linearaccelerator
     * @returns {Map<GuildMember>}
     */
    this.getMemberUUIDMap = function () {
      return this.members.length ? new Map(this.members.map(m => [new GuildMember(m).uuid, new GuildMember(m)])) : null;
    };
    /**
     * Returns a guild rank by priority
     * @author linearaccelerator
     * @param {number} priority - The priority of the guild rank
     * @returns {GuildRank}
     */
    this.getRankByPriority = function (priority) {
      if (!this.ranks.length || !this.ranks.some(r => r.priority === priority)) return null;
      return new GuildRank(this.ranks.find(r => r.priority === priority));
    };
    /**
     * Date of guild creation as timestamp
     * @readonly
     * @type {String}
     */
    this.createdAtTimestamp = data.created;
    /**
     * Date of guild creation
     * @readonly
     * @type {Date}
     */
    this.createdAt = new Date(data.created);
    /**
     * Whether this guild can be joined using /g join
     * @readonly
     * @type {boolean}
     */
    this.joinable = data.joinable ? data.joinable : false;
    /**
     * Whether this guild is listed in the Guild Finder
     * @readonly
     * @type {boolean}
     */
    this.publiclyListed = !!data.publiclyListed;
    /**
     * Timestamp guild chat will be unmuted at.
     * @readonly
     * @type {number|null}
     */
    this.chatMuteUntilTimestamp = data.chatMute ? data.chatMute : null;
    /**
     * Timestamp guild chat will be unmuted at as Date.
     * @readonly
     * @type {Date|null}
     */
    this.chatMuteUntil = data.chatMute ? new Date(data.chatMute) : null;
    /**
     * Timestamp guild chat will be unmuted at.
     * @readonly
     * @type {Array<{ Pattern: string, Color: string }>}
     */
    this.banner = data.banner ? data.banner : data.banner;
    /**
     * Guild tag
     * @readonly
     * @type {String}
     */
    this.tag = data.tag ? data.tag : null;
    /**
     * Guild tag color
     * @readonly
     * @type {Color}
     */
    this.tagColor = data.tagColor ? new Color(data.tagColor) : null;
    /**
     * Ranking in the number of guild coins owned in the legacy guild system. (0 - indexed)
     * @deprecated
     * @readonly
     * @type {number}
     */
    this.legacyRank = !isNaN(data.legacyRanking) ? parseInt(data.legacyRanking) + 1 : undefined;
    /**
     * Experience history per day
     * @readonly
     * @type {Array<{day:String, exp: number}>}
     */
    this.expHistory = calculateExpHistory(data);
    /**
     * Guild achievements
     * @readonly
     * @type {{winners: number, experienceKings: number, onlinePlayers: number}}
     */
    this.achievements = {
      winners: data.achievements ? data.achievements.WINNERS : 0,
      experienceKings: data.achievements ? data.achievements.EXPERIENCE_KINGS : 0,
      onlinePlayers: data.achievements ? data.achievements.ONLINE_PLAYERS : 0
    };
    /**
     * Guild preferred games
     * @readonly
     * @type {Array<Game>}
     */
    this.preferredGames = data.preferredGames ? data.preferredGames.map(g => new Game(g)) : [];
  }
}
function members (data) {
  return data.members.length ? data.members.map(m => new GuildMember(m)) : [];
}
function ranks (data) {
  return data.ranks.length ? data.ranks.map(r => new GuildRank(r)).sort((a, b) => a.priority - b.priority) : [];
}
/**
 * @param {Object} data
 * @returns {Array}
 */
function calculateExpHistory (data) {
  const array = [];
  const days = Object.keys(data.members[0].expHistory);
  for (const day in Object.keys(data.members[0].expHistory)) {
    let gexp = 0;
    for (const member in data.members) {
      gexp += (data.members[member].expHistory[days[day]] || 0);
    }
    array.push({ day: days[day], exp: gexp });
  }
  return array;
}
module.exports = Guild;

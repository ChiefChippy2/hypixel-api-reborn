# ![](https://i.imgur.com/cDFoQZU.png?1)
# Hypixel API • Reborn
---

![](https://nodei.co/npm/hypixel-api-reborn.png?downloads=true&downloadRank=true&stars=true)

**Reborn Hypixel API Client for Node.js with more new features**

---

• **Easy for use** <br>• Compact Mode<br>• [Discord Support](https://discord.gg/NSEBNMM)

---

# Documentation

| Functions | Arguments | Returns |
| :---: | :---: | :---: |
| getPlayer | UUID / Nickname | Player |
| getGuild | GID / Name / Nickname | Guild |
| getFriends | UUID / Nickname | [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) |
| getWatchdogStats | | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | 
| getOnline | | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |

*Soon will be more functions*

---

# Setup

``` js
const Hypixel = require('hypixel-api-reborn');

// Parameters:
// API Key (String)
// Compart Mode (Boolean)

const hypixel = new Hypixel('API-KEY', true);
```
---

# Examples
### getPlayer

``` js
// Arguments:
// UUID / Player Nickname
hypixel.getPlayer('GravitonSurge').then(async (player) => {
    console.log(player.uuid) // -> 52d9a36f66ce4cdf9a56ad9724ae9fb4
    console.log(player.karma) // -> 4570876
    // if compact mode is ON
    console.log(player.level) // -> 138.01 
    console.log(player.isOnline()) // -> false
})

hypixel.getPlayer('abcde1234').then(async (player) => {
    console.log(player) // -> null
}).catch(e => {
    console.log(e) // -> Player does not exist
})
```

### getGuild

``` js
// Arguments:
// Guild ID / Guild Name / Player Nickname
// id / name / player
hypixel.getGuild('The Foundation', 'name').then(async (guild) => {
    console.log(guild.name) // -> The Foundation
    console.log(guild.description) // -> Foundation ❤ AYS

    //if compact mode is ON
    console.log(guild.level) // -> 73
    console.log(guild.legacyRank) // -> 1
})

hypixel.getGuild('abcde1234', 'name').then(async (guild) => {
    console.log(guild) // -> null
}).catch(e => {
    console.log(e) // -> Guild does not exist
})
```

### getFriends

``` js
// Arguments:
// UUID / Player Nickname
hypixel.getFriends('GravitonSurge').then(async (friends) => {
    console.log(friends.length) // -> 12
})

hypixel.getFriends('abcde1234').then(async (friends) => {

}).catch(e => {
    console.log(e) // -> Player does not exist
})
```

### getWatchdogStats

```js
hypixel.getWatchdogStats().then(async (stats) => {
    console.log(stats)
    /* -> 
    WatchdogStats {
        ByWatchdogTotal: 4112671,
        ByWatchDogLastMinute: 1,
        ByWatchdogRollingDay: 6538,
        ByStaffTotal: 1471159,
        ByStaffRollingDay: 1353
    }
    */
})
```

### getOnline

```js
hypixel.getOnline().then(async (online) => {
    console.log(online) // -> 34327
})
```
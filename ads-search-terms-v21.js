// ════════════════════════════════════════════════════════════════════════════
//  BROWNSTONE — Daily Search Term Report  v21
//  Key fixes vs v20:
//  - GAQL query has NO campaign filter at all (search_term_view is search-only anyway)
//  - Already-blocked terms that fired yesterday are now IN the main table (not hidden
//    in a collapsible) — you now see 100% of what fired that day in one flat list
//  - Yesterday section header shows: "X total (Y new, Z already blocked)"
// ════════════════════════════════════════════════════════════════════════════

var CONFIG = {
  EMAIL:             'hvac4lif@gmail.com',
  MIN_COST_TO_FLAG:  2.00,
  DAYS_TO_LOOK_BACK: 30,

  WEBAPP_URL:    'https://script.google.com/macros/s/AKfycbzt9WbmmDdaRYWizz3NJlgmqbuO7buUFDS0yBveuooHO26q5KpwB9WgioUbgvegjou9aA/exec',
  WEBAPP_SECRET: 'BSTONE2026',

  MANUAL_KEEP:  [],
  MANUAL_BLOCK: [],

  SERVICES_SAFELIST: [
    'mini split cleaning','mini split deep clean','coil cleaning',
    'air conditioner clean','ac clean','ac cleaning',
    'boiler repair','boiler replacement','boiler service',
    'furnace repair','furnace replacement','furnace service',
    'heat pump','ptac','ductless',
    'mini split repair','mini split service','mini split install',
    'ac repair','ac service','ac install',
    'hvac repair','hvac service','hvac install',
    'air conditioning repair','air conditioning service',
    'emergency','no heat','not cooling','not heating',
    'smart thermostat','thermostat install',
    'maintenance plan','tune up',
    'how much','cost','price','financing','tax credit',
    'aire acondicionado','calefaccion','calefacci','climatizacion','reparacion ac',
    'aire acondicionado brooklyn','reparar aire'
  ],

  ALWAYS_BLOCK_KEYWORDS: [
    'costco','home depot','lowes',"lowe's",'amazon','walmart','target',
    'best buy','wayfair','ace hardware','menards','northern tool',
    'how to','diy','do it yourself','youtube','video tutorial',
    'reddit','forum','community','blog','step by step','instructions',
    'troubleshoot yourself','fix myself','fix it myself',
    'tech support','technical support','service manual','warranty claim',
    'parts lookup','parts store','distributor','supplier','wholesale',
    'for sale','serial number','model number','part number','error code',
    'filter replacement','air filter','filters','supplies','equipment sale',
    'buy','purchase','order online','where to buy','shop for',
    'btu','btu calculator','specs','specification',
    'refrigerant','freon','r22','r410a','r-22','r-410a','r32','r-32','r410','r-410',
    'ton unit','ac size','sizing calculator','sizing guide','size calculator',
    'thermostat wiring','nest price','ecobee price','honeywell thermostat',
    'capacitor replacement','contactor replacement','hvac parts',
    'long island city','long island','nassau county','suffolk county',
    'jersey city','hoboken','newark','new jersey',' nj ',
    'westchester','yonkers','mount vernon','white plains','new rochelle',
    'connecticut',' ct ',' li ','hempstead','great neck','valley stream',
    'garden city','levittown','hicksville',
    'hiring','jobs','career','employment','salary','wages','hourly pay',
    'apprentice','training','school','certification','certificate',
    'hvac school','hvac class','hvac training','hvac program',
    'hvac certification','epa 608','nate cert','hvac license',
    'yelp','angi','thumbtack','homeadvisor','angies list',
    'networx','porch','houzz','taskrabbit','task rabbit',
    'buildzoom','build zoom','bark.com','bob vila','this old house',
    'permit','building permit','hvac permit','rebate','tax rebate',
    'energy star','what is hvac','hvac meaning','hvac definition','hvac acronym',
    '311','nyc hpd','hpd violation','dob permit','nyc dob','dob inspection',
    'free air conditioner','free ac','free cooling','nyc free cooling',
    'section 8','nycha','housing authority','low income assistance',
    'portable ac','portable air conditioner','portable unit',
    'portable cooler','portable cooling','portable heat',
    'window ac','window unit','window air conditioner',
    'window mounted','window mount air',
    'room ac','room air conditioner','room cooler',
    'floor ac','freestanding ac','tower fan','tower cooler',
    'through the wall ac','thru wall ac','swamp cooler','evaporative cooler',
    'wall sleeve','wall ac sleeve',
    'goodman','rheem','york hvac','lennox','trane','bryant hvac',
    'carrier northeast','abco','comfort maker','icp hvac',
    'mitsubishi parts','fujitsu parts','lg ac','samsung ac',
    'friedrich hvac','bosch heat pump','amana hvac','heil hvac',
    'ruud ac','nordyne','westinghouse ac',
    'plumber','plumbing','electrician','electrical repair',
    'handyman','roofer','roofing','pest control','exterminator',
    'locksmith','moving company','movers','cleaning service',
    'maid service','janitorial','landscaping','lawn care',
    'contractor license','general contractor',
  ],

  COMPETITOR_NAMES: [
    'cambridge air conditioning','abbey service','cms mechanical','lion hvac',
    'coqui air conditioning','coqui ac','carr air conditioning',
    'mr air nyc','arnica heating','mazgan','iceberg mechanical',
    '212 hvac',"nick's air",'all city heating','vega hvac',
    'absolute mechanical','rivac mechanical','petri plumbing',
    'tf obrien',"t.f. o'brien",'einstein plumbing','cam energy',
    'weather makers','jacky reliable','conforto hvac','dazong',
    'the cooling company','hometown heating','heatspan',
    'north pole cooling','north pole air',
    "mike's air conditioning",'mikes air conditioning',
    'vigilante plumbing','vigilante heating','classic home services',
    'ny hvac services','jmb air','northern wolves','prime air group',
    'amtech air','amtech cooling','gemini thermo','american hvac corp',
    'new york heating','ny heating corp','lightning mechanical','metro air',
    'friedrich air conditioning','airtron','service experts',
    'one hour air','total air hvac','rapid cool hvac',
    'ny comfort','indoor comfort','all seasons hvac',
    'crown air','green apple hvac','jet air','global comfort',
    'city air conditioning','first air hvac','ultimate air',
    'green city mechanical','precision air','reliable air',
    'top air','star air','super cool','cool master',
    'climate control solutions','climate control nyc','climate control brooklyn',
  ],

  ENTITY_TOKENS:   ['inc','llc','corp','corporation','ltd','llp','pllc'],
  ENTITY_PHRASES:  ['& sons','and sons','& son'],
  SERVICED_BRANDS: ['carrier','fujitsu','mitsubishi','daikin'],
  GENERIC_LEAD: [
    'near me','repair','service','best','top','24','hour','emergency',
    'cheap','affordable','local','residential','commercial','brooklyn',
    'company','companies','contractor','my','help'
  ],
  BAD_KEYWORDS: [
    'buy','btu','specs','manual','refrigerant','freon','r22','r410a',
    'ton unit','ac size','calculator','parts','filter','supplies'
  ],
  REPAIR_INTENT_WORDS: [
    'repair','fix','broken','not working','not cooling','not heating',
    'maintenance','tune up','cleaning','emergency','diagnostic',
    'contractor','technician','install','replace','service',
    'leaking','noise','tripping'
  ]
};


// ════════════════════════════════════════════════════════════════════════════
//  CAMPAIGN DISCOVERY
// ════════════════════════════════════════════════════════════════════════════

function getAllActiveCampaignIds() {
  var ids = [];
  try {
    var it = AdsApp.campaigns().withCondition('Status = ENABLED').get();
    while (it.hasNext()) { ids.push(it.next().getId()); }
    Logger.log('Auto-discovered ' + ids.length + ' active campaign(s): ' + ids.join(', '));
  } catch(e) {
    Logger.log('Campaign discovery error: ' + e);
  }
  return ids.length > 0 ? ids : [23097095929, 23064032078];
}


// ════════════════════════════════════════════════════════════════════════════
//  WEB APP COMMANDS
// ════════════════════════════════════════════════════════════════════════════

function processWebAppCommands(ex, campaignIds) {
  var keepSet = {};
  var processed = 0;
  try {
    var keepResp = UrlFetchApp.fetch(CONFIG.WEBAPP_URL + '?action=getkeeps',
      { muteHttpExceptions: true });
    if (keepResp.getResponseCode() === 200) {
      var keeps = JSON.parse(keepResp.getContentText());
      for (var k in keeps) { if (keeps.hasOwnProperty(k)) keepSet[k] = true; }
    }
    var resp = UrlFetchApp.fetch(CONFIG.WEBAPP_URL + '?action=list',
      { muteHttpExceptions: true });
    if (resp.getResponseCode() === 200) {
      var commands = JSON.parse(resp.getContentText());
      if (commands && commands.length > 0) {
        processed = commands.length;
        for (var i = 0; i < commands.length; i++) {
          var c = commands[i];
          var t = (c.t || '').toLowerCase().trim();
          if (!t) continue;
          if (c.a === 'block')   { delete keepSet[t]; blockTermAllCampaigns(t, ex, campaignIds); }
          if (c.a === 'unblock') { removeNegAllCampaigns(t, campaignIds); }
        }
        UrlFetchApp.fetch(CONFIG.WEBAPP_URL + '?action=clear&secret=' + CONFIG.WEBAPP_SECRET,
          { muteHttpExceptions: true });
      }
    }
  } catch(e) {
    Logger.log('Web app error (non-fatal): ' + e);
  }
  return { keepSet: keepSet, processed: processed };
}


// ════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════════════════════

function getMatch(t, list) {
  for (var i = 0; i < list.length; i++) { if (t.indexOf(list[i]) !== -1) return list[i]; }
  return null;
}
function hasRepairIntent(t) { return getMatch(t, CONFIG.REPAIR_INTENT_WORDS) !== null; }
function inSafelist(t)      { return getMatch(t, CONFIG.SERVICES_SAFELIST)    !== null; }

function detectCompany(t) {
  if (t.indexOf('brownstone') !== -1) return null;
  var words = t.replace(/[.,]/g, '').split(/\s+/);
  for (var i = 0; i < CONFIG.ENTITY_TOKENS.length; i++) {
    if (words.indexOf(CONFIG.ENTITY_TOKENS[i]) !== -1)
      return { block: true, why: 'company entity "' + CONFIG.ENTITY_TOKENS[i] + '"' };
  }
  for (var j = 0; j < CONFIG.ENTITY_PHRASES.length; j++) {
    if (t.indexOf(CONFIG.ENTITY_PHRASES[j]) !== -1)
      return { block: true, why: 'company phrase "' + CONFIG.ENTITY_PHRASES[j] + '"' };
  }
  for (var k = 0; k < CONFIG.COMPETITOR_NAMES.length; k++) {
    if (t.indexOf(CONFIG.COMPETITOR_NAMES[k]) !== -1)
      return { block: true, why: 'competitor "' + CONFIG.COMPETITOR_NAMES[k] + '"' };
  }
  if (/heating (and|&) cooling/.test(t)) {
    for (var b = 0; b < CONFIG.SERVICED_BRANDS.length; b++) {
      if (t.indexOf(CONFIG.SERVICED_BRANDS[b]) !== -1) return null;
    }
    for (var g = 0; g < CONFIG.GENERIC_LEAD.length; g++) {
      if (t.indexOf(CONFIG.GENERIC_LEAD[g]) !== -1) return null;
    }
    return { block: true, why: 'company pattern "heating & cooling"' };
  }
  return null;
}

function formatDate(d) { return (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear(); }
function fmtDash(d) {
  return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
}

function btn(label, term, action, bg) {
  var url = CONFIG.WEBAPP_URL + '?action=' + action
    + '&term=' + encodeURIComponent(term)
    + '&secret=' + encodeURIComponent(CONFIG.WEBAPP_SECRET);
  return '<a href="' + url + '" target="_blank" style="display:inline-block;padding:5px 11px;'
    + 'background:' + bg + ';color:#fff;border-radius:4px;text-decoration:none;'
    + 'font-size:12px;font-weight:bold;margin:2px 2px 0 0">' + label + '</a>';
}


// ════════════════════════════════════════════════════════════════════════════
//  NEGATIVES
// ════════════════════════════════════════════════════════════════════════════

function getExistingNegatives(campaignIds) {
  var ex = {};
  for (var c = 0; c < campaignIds.length; c++) {
    var it = AdsApp.campaigns().withIds([campaignIds[c]]).get();
    if (!it.hasNext()) continue;
    var ni = it.next().negativeKeywords().get();
    while (ni.hasNext()) { ex[ni.next().getText().replace(/[\[\]"]/g,'').toLowerCase()] = true; }
  }
  return ex;
}

function blockTermAllCampaigns(term, ex, campaignIds) {
  var c = term.toLowerCase().trim();
  if (ex[c]) return false;
  var did = false;
  for (var i = 0; i < campaignIds.length; i++) {
    var ci = AdsApp.campaigns().withIds([campaignIds[i]]).get();
    if (ci.hasNext()) { ci.next().createNegativeKeyword('[' + c + ']'); ex[c] = true; did = true; }
  }
  return did;
}

function removeNegAllCampaigns(term, campaignIds) {
  var target = term.toLowerCase().trim();
  for (var i = 0; i < campaignIds.length; i++) {
    var ci = AdsApp.campaigns().withIds([campaignIds[i]]).get();
    if (!ci.hasNext()) continue;
    var ni = ci.next().negativeKeywords().get();
    while (ni.hasNext()) {
      var neg = ni.next();
      if (neg.getText().replace(/[\[\]"]/g,'').toLowerCase().trim() === target) neg.remove();
    }
  }
}


// ════════════════════════════════════════════════════════════════════════════
//  CLASSIFY
// ════════════════════════════════════════════════════════════════════════════

function classifyTerm(term, totalCost, totalConv, ex, counters, keepSet, campaignIds) {
  if (term.indexOf('brownstone') !== -1) return { tag: 'clean', reason: '' };
  if (keepSet && keepSet[term])          return { tag: 'clean', reason: 'You approved this ✓' };
  if (getMatch(term, CONFIG.MANUAL_KEEP))  return { tag: 'clean', reason: 'Manual keep' };
  if (getMatch(term, CONFIG.MANUAL_BLOCK)) {
    blockTermAllCampaigns(term, ex, campaignIds); counters.blocked++;
    return { tag: 'block', reason: 'Manual block' };
  }
  var tag = 'clean', reason = '';
  if (inSafelist(term)) {
    if (totalCost >= CONFIG.MIN_COST_TO_FLAG && totalConv === 0) {
      tag = 'review'; reason = 'Service term — $'+totalCost.toFixed(2)+' spent, no conv yet';
      counters.review++;
    }
  } else {
    var am = getMatch(term, CONFIG.ALWAYS_BLOCK_KEYWORDS);
    if (am) {
      tag = 'block'; reason = 'Matched "'+am+'"';
      if (blockTermAllCampaigns(term, ex, campaignIds)) counters.blocked++;
    } else {
      var co = detectCompany(term);
      if (co && co.block) {
        tag = 'block'; reason = co.why;
        if (blockTermAllCampaigns(term, ex, campaignIds)) counters.blocked++;
      } else {
        var bm = getMatch(term, CONFIG.BAD_KEYWORDS);
        if (bm) {
          if (hasRepairIntent(term)) {
            tag = 'review'; reason = '"'+bm+'" but has repair intent'; counters.review++;
          } else {
            tag = 'block'; reason = 'Bad keyword "'+bm+'"';
            if (blockTermAllCampaigns(term, ex, campaignIds)) counters.blocked++;
          }
        } else if (totalCost >= CONFIG.MIN_COST_TO_FLAG && totalConv === 0) {
          tag = 'review'; reason = '$'+totalCost.toFixed(2)+' spent, no conversion';
          counters.review++;
        }
      }
    }
  }
  return { tag: tag, reason: reason };
}


// ════════════════════════════════════════════════════════════════════════════
//  MAIN
// ════════════════════════════════════════════════════════════════════════════

function main() {
  var today     = new Date();
  var yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  var start30   = new Date(today); start30.setDate(today.getDate() - CONFIG.DAYS_TO_LOOK_BACK);
  var yStr      = fmtDash(yesterday);

  var campaignIds = getAllActiveCampaignIds();
  var ex          = getExistingNegatives(campaignIds);
  var webResult   = processWebAppCommands(ex, campaignIds);
  var keepSet     = webResult.keepSet;
  var counters    = { blocked:0, review:0, alreadyBlocked:0, checked:0, processed: webResult.processed };
  var allMap = {}, yMap = {}, yExcluded = {};

  // No campaign filter — search_term_view is search-only by nature; any filter
  // risks silently dropping terms from campaigns with non-standard channel types
  var q = 'SELECT search_term_view.search_term, metrics.cost_micros, metrics.clicks, '
    + 'metrics.conversions, search_term_view.status, segments.date '
    + 'FROM search_term_view '
    + 'WHERE segments.date BETWEEN "' + fmtDash(start30) + '" AND "' + yStr + '"';

  var res = AdsApp.search(q);
  while (res.hasNext()) {
    var row    = res.next();
    var status = row.searchTermView.status;
    var term   = row.searchTermView.searchTerm.toLowerCase().trim();
    var cost   = row.metrics.costMicros / 1000000;
    var conv   = row.metrics.conversions;
    var clicks = row.metrics.clicks;
    var rDate  = row.segments.date;
    counters.checked++;

    if (status === 'EXCLUDED') {
      counters.alreadyBlocked++;
      // Track already-blocked terms that fired yesterday — shown inline in main table
      if (rDate === yStr) {
        if (!yExcluded[term]) yExcluded[term] = { term:term, cost:0, clicks:0, conv:0 };
        yExcluded[term].cost  += cost;
        yExcluded[term].clicks += clicks;
        yExcluded[term].conv  += conv;
      }
      continue;
    }

    if (!allMap[term]) allMap[term] = { term:term, cost:0, clicks:0, conv:0 };
    allMap[term].cost += cost; allMap[term].clicks += clicks; allMap[term].conv += conv;
    if (rDate === yStr) {
      if (!yMap[term]) yMap[term] = { term:term, cost:0, clicks:0, conv:0 };
      yMap[term].cost += cost; yMap[term].clicks += clicks; yMap[term].conv += conv;
    }
  }

  // Classify non-excluded terms
  for (var t in allMap) {
    if (!allMap.hasOwnProperty(t)) continue;
    var entry = allMap[t];
    var cls   = classifyTerm(t, entry.cost, entry.conv, ex, counters, keepSet, campaignIds);
    entry.tag = cls.tag; entry.reason = cls.reason;
    if (yMap[t]) { yMap[t].tag = cls.tag; yMap[t].reason = cls.reason; }
  }

  var thirtyDayList = sortedArray(allMap);

  // Build yesterday list: new terms first (sorted by cost), then already-blocked (sorted by cost)
  var newTermsArr      = sortedArray(yMap);
  var alreadyBlockedArr = sortedArray(yExcluded);
  for (var ai = 0; ai < alreadyBlockedArr.length; ai++) {
    alreadyBlockedArr[ai].tag    = 'already_blocked';
    alreadyBlockedArr[ai].reason = 'Already in your negative keyword list';
  }
  // Combine: new terms on top, already-blocked below
  var yesterdayList = newTermsArr.concat(alreadyBlockedArr);

  Logger.log('Campaigns: '+campaignIds.length+' | Rows checked: '+counters.checked
    +' | New auto-blocks today: '+counters.blocked+' | Flagged for review: '+counters.review
    +' | Already-blocked (in list): '+counters.alreadyBlocked
    +' | Yesterday new terms: '+newTermsArr.length
    +' | Yesterday already-blocked: '+alreadyBlockedArr.length);

  sendReport(counters, today, yesterday, yesterdayList, newTermsArr.length, alreadyBlockedArr.length,
             thirtyDayList, ex, campaignIds.length);
}

function sortedArray(map) {
  var arr = [];
  for (var k in map) { if (map.hasOwnProperty(k)) arr.push(map[k]); }
  arr.sort(function(a,b){ return b.cost - a.cost; });
  return arr;
}


// ════════════════════════════════════════════════════════════════════════════
//  EMAIL
// ════════════════════════════════════════════════════════════════════════════

function sendReport(counters, today, yesterday, yesterdayList, newCount, blockedCount,
                    thirtyDayList, ex, numCampaigns) {

  function badge(tag) {
    if (tag === 'block')
      return '<span style="background:#fee2e2;color:#b91c1c;padding:1px 8px;border-radius:3px;font-size:11px;font-weight:bold">AUTO-BLOCKED</span>';
    if (tag === 'already_blocked')
      return '<span style="background:#f3f4f6;color:#6b7280;padding:1px 8px;border-radius:3px;font-size:11px;font-weight:bold">🚫 ALREADY BLOCKED</span>';
    if (tag === 'review')
      return '<span style="background:#fef3c7;color:#92400e;padding:1px 8px;border-radius:3px;font-size:11px;font-weight:bold">⚠ REVIEW</span>';
    return '<span style="background:#dcfce7;color:#166534;padding:1px 8px;border-radius:3px;font-size:11px">OK</span>';
  }

  function actionCell(r) {
    if (r.tag === 'already_blocked')
      return badge(r.tag) + '<br>' + btn('↩ Unblock', r.term, 'unblock', '#6b7280');
    if (r.tag === 'block')
      return badge(r.tag) + '<br>' + btn('↩ Undo Block', r.term, 'unblock', '#6b7280');
    if (r.tag === 'review')
      return badge(r.tag) + '<br>'
        + btn('🚫 Block It', r.term, 'block', '#dc2626')
        + btn('✅ Keep It',  r.term, 'keep',  '#16a34a');
    return badge(r.tag) + '<br>' + btn('🚫 Block', r.term, 'block', '#9ca3af');
  }

  function buildTable(list, fs) {
    if (!list.length) return '<p style="color:#888;font-style:italic">No terms.</p>';
    var h = '<table border="1" cellpadding="7" cellspacing="0" '
      + 'style="border-collapse:collapse;font-size:'+fs+';width:100%;table-layout:fixed">'
      + '<colgroup><col style="width:38%"><col style="width:8%"><col style="width:11%">'
      + '<col style="width:7%"><col style="width:36%"></colgroup>'
      + '<tr style="background:#e5e7eb"><th>Search Term</th><th>Clicks</th>'
      + '<th>Cost</th><th>Conv</th><th>Status / Action</th></tr>';
    for (var i = 0; i < list.length; i++) {
      var r  = list[i];
      var bg = r.tag === 'block'          ? '#fff5f5'
             : r.tag === 'already_blocked'? '#f9fafb'
             : r.tag === 'review'         ? '#fffbeb'
             : '#ffffff';
      var termStyle = r.tag === 'already_blocked'
        ? 'color:#9ca3af;text-decoration:line-through'
        : '';
      var nt = r.reason
        ? '<br><span style="color:#999;font-size:10px">'+r.reason+'</span>'
        : '';
      h += '<tr style="background:'+bg+';vertical-align:top">'
        + '<td style="'+termStyle+'">'+r.term+nt+'</td>'
        + '<td>'+r.clicks+'</td>'
        + '<td>$'+r.cost.toFixed(2)+'</td>'
        + '<td>'+r.conv+'</td>'
        + '<td>'+actionCell(r)+'</td></tr>';
    }
    return h + '</table>';
  }

  var processedNote = counters.processed > 0
    ? '<p style="color:#1d4ed8;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;'
      + 'padding:8px 12px;font-size:12px;margin:10px 0 0">⚡ <b>'+counters.processed
      + ' button action(s)</b> from your last review were applied in this run.</p>'
    : '';

  var negTerms = [];
  for (var nk in ex) { if (ex.hasOwnProperty(nk)) negTerms.push(nk); }
  negTerms.sort();

  var negRows = '';
  for (var ni = 0; ni < negTerms.length; ni++) {
    var nt2    = negTerms[ni];
    var rowBg2 = ni % 2 === 0 ? '#ffffff' : '#f9fafb';
    negRows += '<tr style="background:'+rowBg2+'">'
      + '<td style="padding:6px 8px;font-size:12px;color:#374151">🚫 '+nt2+'</td>'
      + '<td style="padding:6px 8px">'+btn('↩ Remove', nt2, 'unblock', '#6b7280')+'</td></tr>';
  }

  var negHtml = '<hr style="border:none;border-top:2px solid #e5e7eb;margin:24px 0 12px">'
    + '<h3 style="margin-bottom:4px">🚫 All Blocked Keywords ('+negTerms.length+' total)</h3>'
    + '<p style="color:#666;font-size:12px;margin:0 0 10px">Click <b>↩ Remove</b> to unblock a term.</p>'
    + '<table border="1" cellpadding="0" cellspacing="0" '
    + 'style="border-collapse:collapse;width:100%;table-layout:fixed">'
    + '<colgroup><col style="width:72%"><col style="width:28%"></colgroup>'
    + '<tr style="background:#e5e7eb">'
    + '<th style="padding:6px 8px;text-align:left;font-size:12px">Blocked Term</th>'
    + '<th style="padding:6px 8px;text-align:left;font-size:12px">Action</th></tr>'
    + negRows + '</table>';

  var total  = newCount + blockedCount;
  var yLabel = total + ' total'
    + ' (' + newCount + ' new'
    + (blockedCount > 0 ? ', ' + blockedCount + ' already blocked' : '')
    + ')';

  var yHtml = yesterdayList.length === 0
    ? '<p style="color:#888;font-style:italic">No terms for '
      + formatDate(yesterday) + ' yet — data is usually ready by 8am next morning.</p>'
    : buildTable(yesterdayList, '13px');

  var body = '<div style="font-family:sans-serif;max-width:700px;color:#111">'
    + '<h2 style="color:#b91c1c;margin-bottom:4px">Brownstone HVAC — Daily Search Terms</h2>'
    + '<p style="margin-top:0;color:#555;font-size:13px"><b>'+formatDate(today)+'</b>'
    + ' &nbsp;|&nbsp; Campaigns: <b>'+numCampaigns+'</b>'
    + ' &nbsp;|&nbsp; Auto-blocked today: <b>'+counters.blocked+'</b>'
    + ' &nbsp;|&nbsp; Flagged: <b>'+counters.review+'</b>'
    + ' &nbsp;|&nbsp; Total negatives: <b>'+negTerms.length+'</b></p>'
    + '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;'
    + 'padding:10px 16px;margin:14px 0;font-size:12px;color:#14532d">'
    + '✅ <b>One-click mode active.</b> Approved terms are saved permanently.'
    + '<br><span style="opacity:0.75">Button actions are applied in the '
    + '<b>next morning\'s report</b>.</span></div>'
    + processedNote
    + '<hr style="border:none;border-top:2px solid #e5e7eb;margin:16px 0 12px">'
    + '<h3 style="margin-bottom:2px">📋 Yesterday — '+formatDate(yesterday)
    + ' &nbsp;<span style="font-weight:normal;font-size:13px;color:#555">('+yLabel+')</span></h3>'
    + '<p style="color:#888;font-size:11px;margin:0 0 8px">Strikethrough rows = '
    + 'already in your negative list (firing but blocked). '
    + 'Compare this total count to Google Ads → Search Terms to verify coverage.</p>'
    + yHtml
    + '<hr style="border:none;border-top:2px solid #e5e7eb;margin:24px 0 12px">'
    + '<h3 style="margin-bottom:6px">📊 Last 30 Days ('
    + thirtyDayList.length+' terms, sorted by cost)</h3>'
    + buildTable(thirtyDayList, '12px')
    + negHtml
    + '<p style="color:#bbb;font-size:11px;margin-top:20px">v21 — Brownstone HVAC</p></div>';

  MailApp.sendEmail({
    to:       CONFIG.EMAIL,
    subject:  'Brownstone Search Terms — ' + formatDate(today),
    htmlBody: body
  });
  Logger.log('Email sent.');
}

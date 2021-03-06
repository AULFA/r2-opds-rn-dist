"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var serializable_1 = require("r2-lcp-rn/dist/es5/src/serializable");
var init_globals_1 = require("../src/opds/init-globals");
var opds2_1 = require("../src/opds/opds2/opds2");
var helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
var contextStr1 = "http://context1";
var contextStr2 = "http://context2";
ava_1.default("JSON SERIALIZE: OPDSFeed.Context => string[]", function (t) {
    var feed = new opds2_1.OPDSFeed();
    feed.Context = [];
    feed.Context.push(contextStr1);
    feed.Context.push(contextStr2);
    helpers_1.inspect(feed);
    var json = serializable_1.TaJsonSerialize(feed);
    helpers_1.logJSON(json);
    helpers_1.checkType_Array(t, json["@context"]);
    var ctx = json["@context"];
    t.is(ctx.length, 2);
    helpers_1.checkType_String(t, ctx[0]);
    t.is(ctx[0], contextStr1);
    helpers_1.checkType_String(t, ctx[1]);
    t.is(ctx[1], contextStr2);
});
ava_1.default("JSON SERIALIZE: OPDSFeed.Context => string[1] collapse-array", function (t) {
    var feed = new opds2_1.OPDSFeed();
    feed.Context = [contextStr1];
    helpers_1.inspect(feed);
    var json = serializable_1.TaJsonSerialize(feed);
    helpers_1.logJSON(json);
    helpers_1.checkType_String(t, json["@context"]);
    t.is(json["@context"], contextStr1);
});
ava_1.default("JSON DESERIALIZE: OPDSFeed.Context => string[]", function (t) {
    var json = {};
    json["@context"] = [contextStr1, contextStr2];
    helpers_1.logJSON(json);
    var feed = serializable_1.TaJsonDeserialize(json, opds2_1.OPDSFeed);
    helpers_1.inspect(feed);
    helpers_1.checkType_Array(t, feed.Context);
    t.is(feed.Context.length, 2);
    helpers_1.checkType_String(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
    helpers_1.checkType_String(t, feed.Context[1]);
    t.is(feed.Context[1], contextStr2);
});
ava_1.default("JSON DESERIALIZE: OPDSFeed.Context => string[1]", function (t) {
    var json = {};
    json["@context"] = [contextStr1];
    helpers_1.logJSON(json);
    var feed = serializable_1.TaJsonDeserialize(json, opds2_1.OPDSFeed);
    helpers_1.inspect(feed);
    helpers_1.checkType_Array(t, feed.Context);
    t.is(feed.Context.length, 1);
    helpers_1.checkType_String(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
});
ava_1.default("JSON DESERIALIZE: OPDSFeed.Context => string", function (t) {
    var json = {};
    json["@context"] = contextStr1;
    helpers_1.logJSON(json);
    var feed = serializable_1.TaJsonDeserialize(json, opds2_1.OPDSFeed);
    helpers_1.inspect(feed);
    helpers_1.checkType_Array(t, feed.Context);
    t.is(feed.Context.length, 1);
    helpers_1.checkType_String(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
});
//# sourceMappingURL=test-JSON-Context.js.map
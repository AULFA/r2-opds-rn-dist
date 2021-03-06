"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var serializable_1 = require("r2-lcp-rn/dist/es5/src/serializable");
var init_globals_1 = require("../src/opds/init-globals");
var opds2_link_1 = require("../src/opds/opds2/opds2-link");
var helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
var relStr1 = "rel1";
var relStr2 = "rel2";
ava_1.default("JSON SERIALIZE: OPDSLink.Rel => string[]", function (t) {
    var link = new opds2_link_1.OPDSLink();
    link.AddRel(relStr1);
    link.AddRel(relStr2);
    helpers_1.inspect(link);
    var json = serializable_1.TaJsonSerialize(link);
    helpers_1.logJSON(json);
    helpers_1.checkType_Array(t, json.rel);
    var arr = json.rel;
    t.is(arr.length, 2);
    helpers_1.checkType_String(t, arr[0]);
    t.is(arr[0], relStr1);
    helpers_1.checkType_String(t, arr[1]);
    t.is(arr[1], relStr2);
});
ava_1.default("JSON SERIALIZE: OPDSLink.Rel => string[] (recursive links)", function (t) {
    var link = new opds2_link_1.OPDSLink();
    link.AddRel(relStr1);
    link.AddRel(relStr2);
    var child = new opds2_link_1.OPDSLink();
    child.AddRel(relStr2);
    child.AddRel(relStr1);
    link.Children = [];
    link.Children.push(child);
    helpers_1.inspect(link);
    var json = serializable_1.TaJsonSerialize(link);
    helpers_1.logJSON(json);
    helpers_1.checkType_Array(t, json.rel);
    var arr = json.rel;
    t.is(arr.length, 2);
    helpers_1.checkType_String(t, arr[0]);
    t.is(arr[0], relStr1);
    helpers_1.checkType_String(t, arr[1]);
    t.is(arr[1], relStr2);
    helpers_1.checkType_Array(t, json.children);
    var children = json.children;
    t.is(children.length, 1);
    var child1 = children[0];
    helpers_1.checkType_Array(t, child1.rel);
    var rels = child1.rel;
    t.is(rels.length, 2);
    helpers_1.checkType_String(t, rels[0]);
    t.is(rels[0], relStr2);
    helpers_1.checkType_String(t, rels[1]);
    t.is(rels[1], relStr1);
});
ava_1.default("JSON SERIALIZE: OPDSLink.Rel => string", function (t) {
    var link = new opds2_link_1.OPDSLink();
    link.AddRel(relStr1);
    helpers_1.inspect(link);
    var json = serializable_1.TaJsonSerialize(link);
    helpers_1.logJSON(json);
    helpers_1.checkType_String(t, json.rel);
    t.is(json.rel, relStr1);
});
ava_1.default("JSON SERIALIZE: OPDSLink.Rel => string (recursive links)", function (t) {
    var link = new opds2_link_1.OPDSLink();
    link.AddRel(relStr1);
    var child = new opds2_link_1.OPDSLink();
    child.AddRel(relStr2);
    link.Children = [];
    link.Children.push(child);
    helpers_1.inspect(link);
    var json = serializable_1.TaJsonSerialize(link);
    helpers_1.logJSON(json);
    helpers_1.checkType_String(t, json.rel);
    t.is(json.rel, relStr1);
    helpers_1.checkType_Array(t, json.children);
    var children = json.children;
    t.is(children.length, 1);
    var child1 = children[0];
    helpers_1.checkType_String(t, child1.rel);
    t.is(child1.rel, relStr2);
});
ava_1.default("JSON DESERIALIZE: OPDSLink.Rel => string[]", function (t) {
    var json = {};
    json.rel = [relStr1, relStr2];
    helpers_1.logJSON(json);
    var link = serializable_1.TaJsonDeserialize(json, opds2_link_1.OPDSLink);
    helpers_1.inspect(link);
    helpers_1.checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 2);
    helpers_1.checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
    helpers_1.checkType_String(t, link.Rel[1]);
    t.is(link.Rel[1], relStr2);
});
ava_1.default("JSON DESERIALIZE: OPDSLink.Rel => string[] (recursive children)", function (t) {
    var json = {};
    json.rel = [relStr1, relStr2];
    json.children = [];
    json.children.push({ rel: [relStr2, relStr1] });
    helpers_1.logJSON(json);
    var link = serializable_1.TaJsonDeserialize(json, opds2_link_1.OPDSLink);
    helpers_1.inspect(link);
    helpers_1.checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 2);
    helpers_1.checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
    helpers_1.checkType_String(t, link.Rel[1]);
    t.is(link.Rel[1], relStr2);
    helpers_1.checkType_Array(t, link.Children);
    t.is(link.Children.length, 1);
    helpers_1.checkType_Array(t, link.Children[0].Rel);
    t.is(link.Children[0].Rel.length, 2);
    helpers_1.checkType_String(t, link.Children[0].Rel[0]);
    t.is(link.Children[0].Rel[0], relStr2);
    helpers_1.checkType_String(t, link.Children[0].Rel[1]);
    t.is(link.Children[0].Rel[1], relStr1);
});
ava_1.default("JSON DESERIALIZE: OPDSLink.Rel => string[1]", function (t) {
    var json = {};
    json.rel = [relStr1];
    helpers_1.logJSON(json);
    var link = serializable_1.TaJsonDeserialize(json, opds2_link_1.OPDSLink);
    helpers_1.inspect(link);
    helpers_1.checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 1);
    helpers_1.checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
});
ava_1.default("JSON DESERIALIZE: OPDSLink.Rel => string", function (t) {
    var json = {};
    json.rel = relStr1;
    helpers_1.logJSON(json);
    var link = serializable_1.TaJsonDeserialize(json, opds2_link_1.OPDSLink);
    helpers_1.inspect(link);
    helpers_1.checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 1);
    helpers_1.checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
});
ava_1.default("JSON DESERIALIZE: OPDSLink.Rel => string (recursive children)", function (t) {
    var json = {};
    json.rel = relStr1;
    json.children = [];
    json.children.push({ rel: relStr2 });
    helpers_1.logJSON(json);
    var link = serializable_1.TaJsonDeserialize(json, opds2_link_1.OPDSLink);
    helpers_1.inspect(link);
    helpers_1.checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 1);
    helpers_1.checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
    helpers_1.checkType_Array(t, link.Children);
    t.is(link.Children.length, 1);
    helpers_1.checkType_Array(t, link.Children[0].Rel);
    t.is(link.Children[0].Rel.length, 1);
    helpers_1.checkType_String(t, link.Children[0].Rel[0]);
    t.is(link.Children[0].Rel[0], relStr2);
});
//# sourceMappingURL=test-JSON-Rel.js.map
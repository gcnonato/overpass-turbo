// ----------------------------------------------------------------------
// StyleList class

import styleparser from "./Style.js";

styleparser.StyleList = function () {
  this.shapeStyles = {};
  this.textStyles = {};
  this.pointStyles = {};
  this.shieldStyles = {};
};
styleparser.StyleList.prototype = {
  maxwidth: 0,
  subparts: [], // List of subparts used in this StyleList
  validAt: -1, // Zoom level this is valid at (or -1 at all levels - saves recomputing)

  hasStyles: function () {
    // summary:		Does this StyleList contain any styles?
    return (
      this.hasShapeStyles() ||
      this.hasTextStyles() ||
      this.hasPointStyles() ||
      this.hasShieldStyles()
    );
  },

  hasFills: function () {
    // summary:		Does this StyleList contain any styles with a fill?
    for (var s in this.shapeStyles) {
      if (
        !isNaN(this.shapeStyles(s).fill_color) ||
        this.shapeStyles(s).fill_image
      )
        return true;
    }
    return false;
  },

  layerOverride: function () {
    // summary:		If this StyleList manually forces an OSM layer, return it, otherwise null.
    for (var s in this.shapeStyles) {
      if (!isNaN(this.shapeStyles[s].layer)) return this.shapeStyles[s].layer;
    }
    return NaN;
  },

  addSubpart: function (s) {
    // summary:		Record that a subpart is used in this StyleList.
    if (this.subparts.indexOf(s) == -1) {
      this.subparts.push(s);
    }
  },

  isValidAt: function (zoom) {
    // summary:		Is this StyleList valid at a given zoom?
    return this.validAt == -1 || this.validAt == zoom;
  },

  toString: function () {
    // summary:		Summarise StyleList as String - for debugging
    var str = "";
    var k;
    for (k in this.shapeStyles) {
      str += "- SS " + k + "=" + this.shapeStyles[k] + "\n";
    }
    for (k in this.textStyles) {
      str += "- TS " + k + "=" + this.textStyles[k] + "\n";
    }
    for (k in this.pointStyles) {
      str += "- PS " + k + "=" + this.pointStyles[k] + "\n";
    }
    for (k in this.shieldStyles) {
      str += "- sS " + k + "=" + this.shieldStyles[k] + "\n";
    }
    return str;
  },

  hasShapeStyles: function () {
    for (var a in this.shapeStyles) {
      return true;
    }
    return false;
  },
  hasTextStyles: function () {
    for (var a in this.textStyles) {
      return true;
    }
    return false;
  },
  hasPointStyles: function () {
    for (var a in this.pointStyles) {
      return true;
    }
    return false;
  },
  hasShieldStyles: function () {
    for (var a in this.shieldStyles) {
      return true;
    }
    return false;
  }
};

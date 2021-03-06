/*
 * Universal module definition for first.
 */
(function(root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(['require', './global', './util', './enums/SYM'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require);
    } else {
        root.jsccfirst = factory(function(mod) {
            return root["jscc" + mod.split("/").pop()];
        });
    }
}(this,
  /**
   * @param {reqParameter} require
   * @param {...*} others
   * @returns {jscc.first}
   */
  function(require, others) {
    //>>excludeStart("closure", pragmas.closure);
    var jscc = {};
    //>>excludeEnd("closure");
    var global = /** @type {jscc.global} */ (require("./global")),
        util = /** @type {jscc.util} */ (require("./util")),
        SYM = require("./enums/SYM");

    /**
     * Creates an instance of jscc.first.
     * @classdesc Functions relating to FIRST-sets.
     * @constructor
     */
    jscc.first = function() {
    };
    /**
     * Computes the FIRST-sets for all non-terminals of the grammar.
     * Must be called right after the parse and before the table
     * generation methods are performed.
     * @author Jan Max Meyer
     */
    jscc.first.prototype.first = function() {
        var cnt = 0,
            old_cnt = 0;
        var nullable;

        do {
            old_cnt = cnt;
            cnt = 0;

            for (var i = 0; i < global.symbols.length; i++) {
                if (global.symbols[i].kind == SYM.NONTERM) {
                    for (var j = 0; j < global.symbols[i].prods.length; j++) {
                        nullable = false;
                        for (var k = 0; k < global.productions[global.symbols[i].prods[j]].rhs.length; k++) {
                            global.symbols[i].first = util.union(global.symbols[i].first,
                                                                 global.symbols[global.productions[global.symbols[i].prods[j]].rhs[k]].first);

                            nullable =
                                global.symbols[global.productions[global.symbols[i].prods[j]].rhs[k]].nullable;
                            if (!nullable) {
                                break;
                            }
                        }
                        cnt += global.symbols[i].first.length;

                        if (k == global.productions[global.symbols[i].prods[j]].rhs.length) {
                            nullable = true;
                        }

                        if (nullable) {
                            global.symbols[i].nullable = true;
                        }
                    }
                }
            }
        } while (cnt != old_cnt);
    };

    /**
     * Returns all terminals that are possible from a given position
     * of a production's right-hand side.
     * @param {jscc.classes.Item} item - Item to which the lookaheads are added.
     * @param {jscc.classes.Production} p - The production where the computation
     * should be done.
     * @param {number} begin - The offset of the symbol where the
     * rhs_first() begins its calculations.
     * @returns {boolean} True if the whole rest of the right-hand side
     * can be null (epsilon), else false.
     * @author Jan Max Meyer
     */
    jscc.first.prototype.rhs_first = function(item, p, begin) {
        var i;
        for (i = begin; i < p.rhs.length; i++) {
            item.lookahead = util.union(item.lookahead, global.symbols[p.rhs[i]].first);

            if (!global.symbols[p.rhs[i]].nullable) {
                return false;
            }
        }
        return true;
    };
    /**
     * Functions relating to FIRST-sets.
     * @module {jscc.first} jscc/first
     * @requires module:jscc/global
     * @requires module:jscc/util
     */
    return new jscc.first();
}));

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@growbe2/growbe-dashboard')) :
    typeof define === 'function' && define.amd ? define('@growbe2/growbe-greenhouse-module', ['exports', '@angular/core', '@growbe2/growbe-dashboard'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.growbe2 = global.growbe2 || {}, global.growbe2['growbe-greenhouse-module'] = {}), global.ng.core, global.i1));
}(this, (function (exports, i0, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var GreenhouseService = /** @class */ (function () {
        function GreenhouseService() {
        }
        return GreenhouseService;
    }());
    GreenhouseService.ɵfac = function GreenhouseService_Factory(t) { return new (t || GreenhouseService)(); };
    GreenhouseService.ɵprov = i0__namespace.ɵɵdefineInjectable({ token: GreenhouseService, factory: GreenhouseService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(GreenhouseService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var GreenhouseComponent = /** @class */ (function () {
        function GreenhouseComponent() {
        }
        GreenhouseComponent.prototype.ngOnInit = function () {
        };
        return GreenhouseComponent;
    }());
    GreenhouseComponent.ɵfac = function GreenhouseComponent_Factory(t) { return new (t || GreenhouseComponent)(); };
    GreenhouseComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: GreenhouseComponent, selectors: [["lib-greenhouse"]], decls: 2, vars: 0, template: function GreenhouseComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "p");
                i0__namespace.ɵɵtext(1, " greenhouse works! ");
                i0__namespace.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(GreenhouseComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-greenhouse',
                        template: "\n    <p>\n      greenhouse works!\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return []; }, null);
    })();

    var GreenhouseModule = /** @class */ (function () {
        function GreenhouseModule(registry) {
            console.log('ELEMENT', registry);
            registry.addItem({
                name: 'greenhouse',
                component: 'greenhouse',
                componentType: GreenhouseComponent,
            });
        }
        return GreenhouseModule;
    }());
    GreenhouseModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: GreenhouseModule });
    GreenhouseModule.ɵinj = i0__namespace.ɵɵdefineInjector({ factory: function GreenhouseModule_Factory(t) { return new (t || GreenhouseModule)(i0__namespace.ɵɵinject(i1__namespace.DashboardRegistryService)); }, imports: [[
                i1.DashboardModule,
            ]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(GreenhouseModule, { declarations: [GreenhouseComponent], imports: [i1.DashboardModule], exports: [GreenhouseComponent] }); })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(GreenhouseModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [GreenhouseComponent],
                        imports: [
                            i1.DashboardModule,
                        ],
                        exports: [GreenhouseComponent]
                    }]
            }], function () { return [{ type: i1__namespace.DashboardRegistryService }]; }, null);
    })();

    /*
     * Public API Surface of greenhouse
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.GreenhouseComponent = GreenhouseComponent;
    exports.GreenhouseModule = GreenhouseModule;
    exports.GreenhouseService = GreenhouseService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=growbe2-growbe-greenhouse-module.umd.js.map

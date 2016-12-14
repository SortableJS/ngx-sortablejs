"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var sortable_directive_1 = require('./src/sortable.directive');
var SortablejsModule = (function () {
    function SortablejsModule() {
    }
    SortablejsModule.forRoot = function (globalOptions) {
        SortablejsModule._globalOptions = globalOptions;
        return SortablejsModule;
    };
    SortablejsModule._globalOptions = {};
    SortablejsModule = __decorate([
        core_1.NgModule({
            declarations: [sortable_directive_1.SortablejsDirective],
            imports: [common_1.CommonModule],
            exports: [sortable_directive_1.SortablejsDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], SortablejsModule);
    return SortablejsModule;
}());
exports.SortablejsModule = SortablejsModule;
//# sourceMappingURL=index.js.map
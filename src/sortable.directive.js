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
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var Sortable = require('sortablejs');
var SortablejsDirective = (function () {
    function SortablejsDirective(element) {
        this.element = element;
    }
    SortablejsDirective.moveArrayItem = function (array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    };
    SortablejsDirective.moveFormArrayItem = function (formArray, from, to) {
        var relocated = formArray.at(from);
        formArray.removeAt(from);
        formArray.insert(to, relocated);
    };
    SortablejsDirective.prototype.ngOnInit = function () {
        // onChange???
        this._sortable = new Sortable(this.element.nativeElement, this.options);
    };
    SortablejsDirective.prototype.ngOnDestroy = function () {
        this._sortable.destroy();
    };
    Object.defineProperty(SortablejsDirective.prototype, "options", {
        get: function () {
            return Object.assign({}, index_1.SortablejsModule._globalOptions, this._options, this.overridenOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortablejsDirective.prototype, "overridenOptions", {
        get: function () {
            var _this = this;
            if (this._items) {
                return {
                    onEnd: function (event) {
                        if (_this._items instanceof forms_1.FormArray) {
                            SortablejsDirective.moveFormArrayItem(_this._items, event.oldIndex, event.newIndex);
                        }
                        else {
                            SortablejsDirective.moveArrayItem(_this._items, event.oldIndex, event.newIndex);
                        }
                        if (_this._options && _this._options.onEnd) {
                            _this._options.onEnd(event);
                        }
                    }
                };
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('sortablejs'), 
        __metadata('design:type', Object)
    ], SortablejsDirective.prototype, "_items", void 0);
    __decorate([
        core_1.Input('sortablejsOptions'), 
        __metadata('design:type', Object)
    ], SortablejsDirective.prototype, "_options", void 0);
    SortablejsDirective = __decorate([
        core_1.Directive({
            selector: '[sortablejs]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SortablejsDirective);
    return SortablejsDirective;
}());
exports.SortablejsDirective = SortablejsDirective;
//# sourceMappingURL=sortable.directive.js.map
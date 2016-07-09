var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("src/sortable.directive", ['@angular/core', '@angular/forms', "index"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1, index_1;
    var Sortablejs, SortableDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            // trying to import Sortablejs library with either webpack or SystemJS
            Sortablejs = {
                Sortable: (typeof require !== 'undefined' ? require : SystemJS.amdRequire)('sortablejs')
            };
            SortableDirective = (function () {
                function SortableDirective(element) {
                    this.element = element;
                }
                SortableDirective.moveArrayItem = function (array, from, to) {
                    array.splice(to, 0, array.splice(from, 1)[0]);
                };
                SortableDirective.moveFormArrayItem = function (formArray, from, to) {
                    var relocated = formArray.at(from);
                    formArray.removeAt(from);
                    formArray.insert(to, relocated);
                };
                SortableDirective.prototype.ngOnInit = function () {
                    // onChange???
                    this._sortable = new Sortablejs.Sortable(this.element.nativeElement, this.options);
                };
                SortableDirective.prototype.ngOnDestroy = function () {
                    this._sortable.destroy();
                };
                Object.defineProperty(SortableDirective.prototype, "options", {
                    get: function () {
                        return Object.assign({}, index_1.SortablejsConfiguration.defaults, this._options, this.overridenOptions);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SortableDirective.prototype, "overridenOptions", {
                    get: function () {
                        var _this = this;
                        if (this._items) {
                            return {
                                onEnd: function (event) {
                                    if (_this._items instanceof forms_1.FormArray) {
                                        SortableDirective.moveFormArrayItem(_this._items, event.oldIndex, event.newIndex);
                                    }
                                    else {
                                        SortableDirective.moveArrayItem(_this._items, event.oldIndex, event.newIndex);
                                    }
                                    if (_this._options.onEnd) {
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
                ], SortableDirective.prototype, "_items", void 0);
                __decorate([
                    core_1.Input('sortablejsOptions'), 
                    __metadata('design:type', Object)
                ], SortableDirective.prototype, "_options", void 0);
                SortableDirective = __decorate([
                    core_1.Directive({
                        selector: '[sortablejs]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], SortableDirective);
                return SortableDirective;
            }());
            exports_1("SortableDirective", SortableDirective);
        }
    }
});
System.register("index", ["src/sortable.directive"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var sortable_directive_1;
    var SORTABLEJS_DIRECTIVES, SortablejsConfiguration;
    return {
        setters:[
            function (sortable_directive_1_1) {
                sortable_directive_1 = sortable_directive_1_1;
            }],
        execute: function() {
            SORTABLEJS_DIRECTIVES = [
                sortable_directive_1.SortableDirective
            ];
            SortablejsConfiguration = {
                defaults: {}
            };
            exports_2("SortablejsConfiguration", SortablejsConfiguration);
            exports_2("SORTABLEJS_DIRECTIVES", SORTABLEJS_DIRECTIVES);
        }
    }
});
//# sourceMappingURL=index.js.map
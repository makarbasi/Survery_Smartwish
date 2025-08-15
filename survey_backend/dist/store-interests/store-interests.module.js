"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInterestsModule = void 0;
const common_1 = require("@nestjs/common");
const store_interests_service_1 = require("./store-interests.service");
const store_interests_controller_1 = require("./store-interests.controller");
let StoreInterestsModule = class StoreInterestsModule {
};
exports.StoreInterestsModule = StoreInterestsModule;
exports.StoreInterestsModule = StoreInterestsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [store_interests_service_1.StoreInterestsService],
        controllers: [store_interests_controller_1.StoreInterestsController],
        exports: [store_interests_service_1.StoreInterestsService],
    })
], StoreInterestsModule);
//# sourceMappingURL=store-interests.module.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInterest = void 0;
const typeorm_1 = require("typeorm");
const store_interest_image_entity_1 = require("./store-interest-image.entity");
let StoreInterest = class StoreInterest {
};
exports.StoreInterest = StoreInterest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StoreInterest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], StoreInterest.prototype, "storeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_address', type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], StoreInterest.prototype, "storeAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], StoreInterest.prototype, "contactName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], StoreInterest.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], StoreInterest.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'letter_text', type: 'text', nullable: true }),
    __metadata("design:type", String)
], StoreInterest.prototype, "letterText", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StoreInterest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StoreInterest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_interest_image_entity_1.StoreInterestImage, (image) => image.storeInterest, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], StoreInterest.prototype, "images", void 0);
exports.StoreInterest = StoreInterest = __decorate([
    (0, typeorm_1.Entity)('sw_store_interests')
], StoreInterest);
//# sourceMappingURL=store-interest.entity.js.map
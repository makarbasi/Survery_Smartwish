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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInterestsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const store_interests_service_1 = require("./store-interests.service");
let StoreInterestsController = class StoreInterestsController {
    constructor(service) {
        this.service = service;
    }
    async submitInterest(body) {
        console.log('Received store interest submission:', body.storeName);
        if (!body.storeName || !body.storeAddress || !body.contactName) {
            throw new common_1.BadRequestException('Store name, address, and contact name are required');
        }
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const letterText = `LETTER OF INTEREST
Store Partnership Program

Date: ${currentDate}

SmartWish Partnership Team
partnerships@smartwish.com

RE: Expression of Interest for Retail Partnership

Dear SmartWish Partnership Team,

I am writing on behalf of ${body.storeName}, located at ${body.storeAddress}, to formally express our strong interest in becoming an authorized retail partner for SmartWish's innovative digital greeting card technology platform.

After reviewing your partnership program, we believe that SmartWish's cutting-edge digital card creation technology would be an excellent addition to our retail offerings and would provide significant value to our customer base.

Store Information:
• Business Name: ${body.storeName}
• Location: ${body.storeAddress}
• Primary Contact: ${body.contactName}${body.contactEmail ? `\n• Email: ${body.contactEmail}` : ''}${body.contactPhone ? `\n• Phone: ${body.contactPhone}` : ''}

We are particularly interested in:
- Exploring exclusive territory rights for our market area
- Understanding the revenue-sharing structure and profit margins
- Learning about the implementation timeline and setup requirements
- Receiving comprehensive training and marketing support materials

Our establishment has a proven track record of successfully introducing innovative products to our market, and we are confident that we can effectively represent the SmartWish brand while driving meaningful sales growth.

We would welcome the opportunity to discuss this partnership in greater detail at your earliest convenience. Please let us know the next steps in your partnership evaluation process.

Thank you for considering our application. We look forward to the possibility of joining the SmartWish retail network and contributing to your continued success.

Sincerely,

${body.contactName}
${body.storeName}

---
This letter of interest was submitted through the SmartWish Partnership Portal on ${currentDate}.`;
        const created = await this.service.createInterest({ ...body, letterText });
        console.log('Store interest submitted successfully:', created.id);
        return created;
    }
    async list() {
        console.log('Fetching all store interests');
        return this.service.listInterests();
    }
    async getStats() {
        console.log('Fetching store interests statistics');
        return this.service.getStats();
    }
    async getOne(id) {
        console.log('Fetching store interest:', id);
        return this.service.getInterestById(id);
    }
    async uploadImages(id, files) {
        console.log(`Uploading ${files.length} images for store interest:`, id);
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files uploaded');
        }
        const results = [];
        for (const file of files) {
            const publicUrl = `/uploads/store-interests/${path.basename(file.path)}`;
            const saved = await this.service.addImage(id, publicUrl, file.originalname);
            results.push(saved);
        }
        console.log(`Successfully uploaded ${results.length} images`);
        return { images: results };
    }
};
exports.StoreInterestsController = StoreInterestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreInterestsController.prototype, "submitInterest", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreInterestsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreInterestsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreInterestsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = path.join(process.cwd(), 'uploads', 'store-interests');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `store_${req.params.id}_${uniqueSuffix}_${file.originalname}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/'))
                return cb(null, true);
            return cb(new Error('Only image files are allowed'), false);
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], StoreInterestsController.prototype, "uploadImages", null);
exports.StoreInterestsController = StoreInterestsController = __decorate([
    (0, common_1.Controller)('store-interests'),
    __metadata("design:paramtypes", [store_interests_service_1.StoreInterestsService])
], StoreInterestsController);
//# sourceMappingURL=store-interests.controller.js.map
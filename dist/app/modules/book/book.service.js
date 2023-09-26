"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const book_const_1 = require("./book.const");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createData = yield prisma_1.prisma.book.create({ data });
    if (!createData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create course');
    }
    if (createData) {
        const result = yield prisma_1.prisma.book.findUnique({
            where: {
                id: createData === null || createData === void 0 ? void 0 : createData.id,
            },
            include: {
                category: true,
            },
        });
        return result;
    }
});
const getAllData = (filter, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { search, category } = filter, filterData = __rest(filter, ["search", "category"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_const_1.filterOptions.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (category) {
        andConditions.push({
            category: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                id: category,
            },
        });
    }
    if (((_a = Object.keys(filterData)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: filterData[key],
                },
            })),
        });
    }
    const { page, size, skip, minPrice, maxPrice } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    if (minPrice !== undefined && maxPrice !== undefined) {
        andConditions.push({
            price: {
                gte: Number(minPrice),
                lte: Number(maxPrice),
            },
        });
    }
    const whereConditons = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.book.findMany({
        where: whereConditons,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options === null || options === void 0 ? void 0 : options.sortOrder,
            }
            : { price: 'desc' },
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.prisma.book.count();
    return {
        meta: {
            page,
            size,
            total,
            totalPage: Math.ceil(total / size),
        },
        data: result,
    };
});
const getCategoryBooks = (categoryId, title, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.prisma.book.findMany({
        where: {
            category: {
                id: categoryId,
                title,
            },
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options === null || options === void 0 ? void 0 : options.sortOrder,
            }
            : { price: 'desc' },
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.prisma.book.count();
    if ((result === null || result === void 0 ? void 0 : result.length) == 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Books not found!');
    }
    return {
        meta: {
            total,
            size: 1,
            totalPage: Math.round(total / size),
            page,
        },
        data: result,
    };
});
const getData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.update({
        where: {
            id,
        },
        include: {
            category: true,
        },
        data: payload,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.BookService = {
    insertIntoDB,
    getAllData,
    getCategoryBooks,
    getData,
    updateData,
    deleteData,
};

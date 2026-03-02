/* ========= Abstract Products ========= */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* ========= Concrete Products  ========= */
/* ========= Stripe Family ========= */
var StripePayment = /** @class */ (function () {
    function StripePayment() {
    }
    StripePayment.prototype.pay = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // imagine Stripe SDK call هنا
                return [2 /*return*/, { transactionId: "stripe_tx_".concat(Date.now(), " ").concat(currency, " ").concat(amount) }];
            });
        });
    };
    return StripePayment;
}());
var StripeRefund = /** @class */ (function () {
    function StripeRefund() {
    }
    StripeRefund.prototype.refund = function (transactionId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { refundId: "stripe_rf_".concat(transactionId, "_").concat(amount !== null && amount !== void 0 ? amount : "full") }];
            });
        });
    };
    return StripeRefund;
}());
var StripeInvoice = /** @class */ (function () {
    function StripeInvoice() {
    }
    StripeInvoice.prototype.createInvoice = function (customerId, items) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        invoiceId: "stripe_inv_".concat(customerId, "_").concat(items.length, "_").concat(Date.now()),
                    }];
            });
        });
    };
    StripeInvoice.prototype.send = function (invoiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "sent ".concat(invoiceId)]; // send invoice via Stripe
            });
        });
    };
    return StripeInvoice;
}());
var StripeFactory = /** @class */ (function () {
    function StripeFactory() {
    }
    StripeFactory.prototype.createPayment = function () {
        return new StripePayment();
    };
    StripeFactory.prototype.createRefund = function () {
        return new StripeRefund();
    };
    StripeFactory.prototype.createInvoice = function () {
        return new StripeInvoice();
    };
    return StripeFactory;
}());
/* ========= PayPal Family ========= */
var PayPalPayment = /** @class */ (function () {
    function PayPalPayment() {
    }
    PayPalPayment.prototype.pay = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // imagine PayPal SDK call هنا
                return [2 /*return*/, { transactionId: "paypal_tx_".concat(Date.now(), " ").concat(currency, " ").concat(amount) }];
            });
        });
    };
    return PayPalPayment;
}());
var PayPalRefund = /** @class */ (function () {
    function PayPalRefund() {
    }
    PayPalRefund.prototype.refund = function (transactionId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { refundId: "paypal_rf_".concat(transactionId, "_").concat(amount !== null && amount !== void 0 ? amount : "full") }];
            });
        });
    };
    return PayPalRefund;
}());
var PayPalInvoice = /** @class */ (function () {
    function PayPalInvoice() {
    }
    PayPalInvoice.prototype.createInvoice = function (customerId, items) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        invoiceId: "paypal_inv_".concat(customerId, "_").concat(items.length, "_").concat(Date.now()),
                    }];
            });
        });
    };
    PayPalInvoice.prototype.send = function (invoiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "sent ".concat(invoiceId)]; // send invoice via PayPal
            });
        });
    };
    return PayPalInvoice;
}());
var PayPalFactory = /** @class */ (function () {
    function PayPalFactory() {
    }
    PayPalFactory.prototype.createPayment = function () {
        return new PayPalPayment();
    };
    PayPalFactory.prototype.createRefund = function () {
        return new PayPalRefund();
    };
    PayPalFactory.prototype.createInvoice = function () {
        return new PayPalInvoice();
    };
    return PayPalFactory;
}());
/* ========= Client Code ========= */
var CheckoutService = /** @class */ (function () {
    function CheckoutService(factory) {
        this.factory = factory;
    }
    CheckoutService.prototype.processPayment = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var payment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payment = this.factory.createPayment();
                        return [4 /*yield*/, payment.pay(amount, currency)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CheckoutService.prototype.processRefund = function (transactionId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var refund;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refund = this.factory.createRefund();
                        return [4 /*yield*/, refund.refund(transactionId, amount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CheckoutService.prototype.createInvoice = function (customerId, items) {
        return __awaiter(this, void 0, void 0, function () {
            var invoice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invoice = this.factory.createInvoice();
                        return [4 /*yield*/, invoice.createInvoice(customerId, items)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CheckoutService;
}());
/* ========= Usage ========= */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, factory, checkout, result, refundResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = "stripe";
                    factory = provider === "stripe" ? new StripeFactory() : new PayPalFactory();
                    checkout = new CheckoutService(factory);
                    return [4 /*yield*/, checkout.processPayment(20, "USD")];
                case 1:
                    result = _a.sent();
                    console.log("Payment:", result);
                    return [4 /*yield*/, checkout.processRefund(result.transactionId, 10)];
                case 2:
                    refundResult = _a.sent();
                    console.log("Refund:", refundResult);
                    return [2 /*return*/];
            }
        });
    });
}
main();

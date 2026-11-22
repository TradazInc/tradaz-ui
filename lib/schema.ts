import {
  GetAllBanksOutputSchema,
  GetAllBanksQuerySchema,
} from "@/schema/banks";
import {
  CreateBusinessCategoryInputSchema,
  CreateBusinessCategoryOutputSchema,
  DeleteBusinessCategoryParamSchema,
  GetAllBusinessCategoryOutputSchema,
  GetAllBusinessCategoryQuerySchema,
} from "@/schema/businessCategory";
import {
  BaseCreateCartInputSchema,
  CreateCartItemInputSchema,
  CreateCartItemOutputSchema,
  CreateCartOutputSchema,
  DecrementCartItemInputSchema,
  DecrementCartItemOuputSchema,
  DeleteCartItemOutputSchema,
  DeleteCartOutputSchema,
  DeleteCartParamSchema,
  GetAllCartsOutputSchema,
  GetAllCartsQuerySchema,
  GetCartOutputSchema,
  GetCartParamSchema,
  IncrementCartItemInputSchema,
  IncrementCartItemOuputSchema,
  UpdateCartInputSchema,
  UpdateCartOutputSchema,
  UpdateCartParamSchema,
} from "@/schema/cart";
import {
  CreateCheckoutInputSchema,
  CreatePosCheckoutOutputSchema,
  CreateWebCheckoutOutputSchema,
} from "@/schema/checkout";
import {
  GetAllCountriesOutputSchema,
  GetAllCountriesQuerySchema,
} from "@/schema/country";
import {
  CreateCouponInputSchema,
  CreateCouponOutputSchema,
  DeleteCouponParamSchema,
  GetAllCouponOutputSchema,
  GetAllCouponQuerySchema,
  GetCouponOutputSchema,
  GetCouponParamSchema,
  UpdateCouponInputSchema,
  UpdateCouponOutputSchema,
  UpdateCouponParamSchema,
} from "@/schema/coupon";
import {
  CreateExpenseInputSchema,
  CreateExpenseOutputSchema,
  DeleteExpenseParamSchema,
  GetAllExpenseOutputSchema,
  GetAllExpenseQuerySchema,
  UpdateExpenseInputSchema,
  UpdateExpenseOutputSchema,
  UpdateExpenseParamSchema,
} from "@/schema/expense";
import {
  GetFinanceSummaryOutputSchema,
  GetFinanceSummaryQuerySchema,
} from "@/schema/finance";
import { GetUploadSignatureOutputSchema } from "@/schema/media";
import {
  GetAllOrderOutputSchema,
  GetAllOrderQuerySchema,
  GetOrderOutputSchema,
  GetOrderParamSchema,
  UpdateOrderStatusInputSchema,
  UpdateOrderStatusOutputSchema,
  UpdateOrderStatusParamSchema,
} from "@/schema/order";
import {
  CreatePointsConfigInputSchema,
  CreatePointsConfigOutputSchema,
  GetAllPointsConfigOutputSchema,
  GetAllPointsConfigQuerySchema,
  UpdatePointsConfigInputSchema,
  UpdatePointsConfigOutputSchema,
  UpdatePointsConfigParamSchema,
} from "@/schema/pointsConfig";
import {
  CreatePosConfigInputSchema,
  CreatePosConfigOutputSchema,
  DeletePosConfigParamSchema,
  DeleteTerminalConfigParamSchema,
  GetAllPosConfigOutputSchema,
  GetAllPosConfigQuerySchema,
  UpdatePosConfigInputSchema,
  UpdatePosConfigOutputSchema,
  UpdatePosConfigParamSchema,
} from "@/schema/posConfig";
import {
  CreateProductInputSchema,
  CreateProductOutputSchema,
  DeleteProductParamSchema,
  DeleteTeamVariationParamSchema,
  DeleteVariationParamSchema,
  GetAllApprovedProductOutputSchema,
  GetAllApprovedProductQuerySchema,
  GetAllProductOutputSchema,
  GetAllProductQuerySchema,
  GetProductOutputSchema,
  GetProductParamSchema,
  GetApprovedProductOutputSchema,
  GetApprovedProductParamSchema,
  GetApprovedProductQuerySchema,
  UpdateProductInputSchema,
  UpdateProductOutputSchema,
  UpdateProductParamSchema,
  UpdateProductStatusInputSchema,
  UpdateProductStatusOutputSchema,
  UpdateProductStatusParamSchema,
} from "@/schema/product";
import {
  CreateProductCategoryInputSchema,
  CreateProductCategoryOutputSchema,
  DeleteProductCategoryParamSchema,
  GetAllProductCategoryOutputSchema,
  GetAllProductCategoryQuerySchema,
} from "@/schema/productCategory";
import {
  CreateRevenueInputSchema,
  CreateRevenueOutputSchema,
  DeleteRevenueParamSchema,
  GetAllRevenueOutputSchema,
  GetAllRevenueQuerySchema,
  UpdateRevenueInputSchema,
  UpdateRevenueOutputSchema,
  UpdateRevenueParamSchema,
} from "@/schema/revenue";
import {
  CreateShippingConfigInputSchema,
  CreateShippingConfigOutputSchema,
  DeleteShippingConfigParamSchema,
  DeleteShippingMethodParamSchema,
  GetAllShippingConfigOutputSchema,
  GetAllShippingConfigQuerySchema,
  UpdateShippingConfigInputSchema,
  UpdateShippingConfigOutputSchema,
  UpdateShippingConfigParamSchema,
} from "@/schema/shippingConfig";
import {
  CreateSizeTypeInputSchema,
  CreateSizeTypeOutputSchema,
  DeleteSizeParamSchema,
  DeleteSizeTypeParamSchema,
  GetAllSizeTypeOutputSchema,
  GetAllSizeTypeQuerySchema,
  GetSizeTypeOutputSchema,
  GetSizeTypeParamSchema,
  UpdateSizeTypeInputSchema,
  UpdateSizeTypeOutputSchema,
  UpdateSizeTypeParamSchema,
} from "@/schema/sizeType";
import {
  CreateSubaccountInputSchema,
  CreateSubaccountOutputSchema,
  GetAllSubaccountOutputSchema,
  GetAllSubaccountQuerySchema,
  UpdateSubaccountInputSchema,
  UpdateSubaccountOutputSchema,
} from "@/schema/subaccount";
import {
  CreateTransactionInputSchema,
  CreateTransactionOutputSchema,
  GetTransactionOutputSchema,
  GetTransactionParamSchema,
} from "@/schema/transaction";
import {
  CreateUIConfigInputSchema,
  CreateUIConfigOutputSchema,
  DeleteUIConfigOutputSchema,
  GetStorefrontUIConfigOutputSchema,
  GetStorefrontUIConfigParamsSchema,
  GetUIConfigOutputSchema,
} from "@/schema/uiConfig";
import { createSchema } from "@better-fetch/fetch";

export const schema = createSchema(
  {
    // Business categories
    "@get/api/business-categories": {
      query: GetAllBusinessCategoryQuerySchema.optional(),
      output: GetAllBusinessCategoryOutputSchema,
    },
    "@post/api/business-categories": {
      input: CreateBusinessCategoryInputSchema,
      output: CreateBusinessCategoryOutputSchema,
    },
    "@delete/api/business-categories/:id": {
      params: DeleteBusinessCategoryParamSchema,
    },

    // Coupons
    "@get/api/coupons": {
      query: GetAllCouponQuerySchema.optional(),
      output: GetAllCouponOutputSchema,
    },
    "@get/api/coupons/:id": {
      params: GetCouponParamSchema,
      output: GetCouponOutputSchema,
    },
    "@post/api/coupons": {
      input: CreateCouponInputSchema,
      output: CreateCouponOutputSchema,
    },
    "@put/api/coupons/:id": {
      params: UpdateCouponParamSchema,
      input: UpdateCouponInputSchema,
      output: UpdateCouponOutputSchema,
    },
    "@delete/api/coupons/:id": {
      params: DeleteCouponParamSchema,
    },

    // Expenses
    "@get/api/expense": {
      query: GetAllExpenseQuerySchema.optional(),
      output: GetAllExpenseOutputSchema,
    },
    "@post/api/expense": {
      input: CreateExpenseInputSchema,
      output: CreateExpenseOutputSchema,
    },
    "@put/api/expense/:id": {
      params: UpdateExpenseParamSchema,
      input: UpdateExpenseInputSchema,
      output: UpdateExpenseOutputSchema,
    },
    "@delete/api/expense/:id": {
      params: DeleteExpenseParamSchema,
    },

    // Finance
    "@get/api/finance/summary": {
      query: GetFinanceSummaryQuerySchema.optional(),
      output: GetFinanceSummaryOutputSchema,
    },

    // Media
    "@post/api/media/upload-signature": {
      output: GetUploadSignatureOutputSchema,
    },

    // Orders
    "@get/api/orders": {
      query: GetAllOrderQuerySchema.optional(),
      output: GetAllOrderOutputSchema,
    },
    "@get/api/orders/:id": {
      params: GetOrderParamSchema,
      output: GetOrderOutputSchema,
    },
    "@patch/api/orders/:id/status": {
      params: UpdateOrderStatusParamSchema,
      input: UpdateOrderStatusInputSchema,
      output: UpdateOrderStatusOutputSchema,
    },

    // Points configs
    "@get/api/points-config": {
      query: GetAllPointsConfigQuerySchema.optional(),
      output: GetAllPointsConfigOutputSchema,
    },
    "@post/api/points-config": {
      input: CreatePointsConfigInputSchema,
      output: CreatePointsConfigOutputSchema,
    },
    "@put/api/points-config/:id": {
      params: UpdatePointsConfigParamSchema,
      input: UpdatePointsConfigInputSchema,
      output: UpdatePointsConfigOutputSchema,
    },

    // Pos configs
    "@get/api/pos-configs": {
      query: GetAllPosConfigQuerySchema.optional(),
      output: GetAllPosConfigOutputSchema,
    },
    "@post/api/pos-configs": {
      input: CreatePosConfigInputSchema,
      output: CreatePosConfigOutputSchema,
    },
    "@put/api/pos-configs/:id": {
      params: UpdatePosConfigParamSchema,
      input: UpdatePosConfigInputSchema,
      output: UpdatePosConfigOutputSchema,
    },
    "@delete/api/pos-configs/:id": {
      params: DeletePosConfigParamSchema,
    },
    "@delete/api/pos-configs/terminal-configs/:id": {
      params: DeleteTerminalConfigParamSchema,
    },

    // Product categories
    "@get/api/product-categories": {
      query: GetAllProductCategoryQuerySchema.optional(),
      output: GetAllProductCategoryOutputSchema,
    },
    "@post/api/product-categories": {
      input: CreateProductCategoryInputSchema,
      output: CreateProductCategoryOutputSchema,
    },
    "@delete/api/product-categories/:id": {
      params: DeleteProductCategoryParamSchema,
    },

    // Products
    "@get/api/products/approved": {
      query: GetAllApprovedProductQuerySchema.optional(),
      output: GetAllApprovedProductOutputSchema,
    },
    "@get/api/products": {
      query: GetAllProductQuerySchema.optional(),
      output: GetAllProductOutputSchema,
    },
    "@get/api/products/:id/approved": {
      params: GetApprovedProductParamSchema,
      query: GetApprovedProductQuerySchema.optional(),
      output: GetApprovedProductOutputSchema,
    },
    "@get/api/products/:id": {
      params: GetProductParamSchema,
      output: GetProductOutputSchema,
    },
    "@post/api/products": {
      input: CreateProductInputSchema,
      output: CreateProductOutputSchema,
    },
    "@patch/api/products/:id/status": {
      params: UpdateProductStatusParamSchema,
      input: UpdateProductStatusInputSchema,
      output: UpdateProductStatusOutputSchema,
    },
    "@put/api/products/:id": {
      params: UpdateProductParamSchema,
      input: UpdateProductInputSchema,
      output: UpdateProductOutputSchema,
    },
    "@delete/api/products/:id": {
      params: DeleteProductParamSchema,
    },
    "@delete/api/products/variations/:id": {
      params: DeleteVariationParamSchema,
    },
    "@delete/api/products/team-variations/:id": {
      params: DeleteTeamVariationParamSchema,
    },

    // Revenue
    "@get/api/revenue": {
      query: GetAllRevenueQuerySchema.optional(),
      output: GetAllRevenueOutputSchema,
    },
    "@post/api/revenue": {
      input: CreateRevenueInputSchema,
      output: CreateRevenueOutputSchema,
    },
    "@put/api/revenue/:id": {
      params: UpdateRevenueParamSchema,
      input: UpdateRevenueInputSchema,
      output: UpdateRevenueOutputSchema,
    },
    "@delete/api/revenue/:id": {
      params: DeleteRevenueParamSchema,
    },

    // Shipping configs
    "@get/api/shipping-configs": {
      query: GetAllShippingConfigQuerySchema.optional(),
      output: GetAllShippingConfigOutputSchema,
    },
    "@post/api/shipping-configs": {
      input: CreateShippingConfigInputSchema,
      output: CreateShippingConfigOutputSchema,
    },
    "@put/api/shipping-configs/:id": {
      params: UpdateShippingConfigParamSchema,
      input: UpdateShippingConfigInputSchema,
      output: UpdateShippingConfigOutputSchema,
    },
    "@delete/api/shipping-configs/:id": {
      params: DeleteShippingConfigParamSchema,
    },
    "@delete/api/shipping-configs/shipping-methods/:id": {
      params: DeleteShippingMethodParamSchema,
    },

    // Size types
    "@get/api/size-types": {
      query: GetAllSizeTypeQuerySchema.optional(),
      output: GetAllSizeTypeOutputSchema,
    },
    "@get/api/size-types/:id": {
      params: GetSizeTypeParamSchema,
      output: GetSizeTypeOutputSchema,
    },
    "@post/api/size-types": {
      input: CreateSizeTypeInputSchema,
      output: CreateSizeTypeOutputSchema,
    },
    "@put/api/size-types/:id": {
      params: UpdateSizeTypeParamSchema,
      input: UpdateSizeTypeInputSchema,
      output: UpdateSizeTypeOutputSchema,
    },
    "@delete/api/size-types/:id": {
      params: DeleteSizeTypeParamSchema,
    },
    "@delete/api/size-types/sizes/:id": {
      params: DeleteSizeParamSchema,
    },

    // Subaccounts
    "@get/api/subaccounts": {
      query: GetAllSubaccountQuerySchema.optional(),
      output: GetAllSubaccountOutputSchema,
    },
    "@post/api/subaccounts": {
      input: CreateSubaccountInputSchema,
      output: CreateSubaccountOutputSchema,
    },
    "@put/api/subaccounts": {
      input: UpdateSubaccountInputSchema,
      output: UpdateSubaccountOutputSchema,
    },

    // Transactions
    "@get/api/transactions/:id": {
      params: GetTransactionParamSchema,
      output: GetTransactionOutputSchema,
    },
    "@post/api/transactions": {
      input: CreateTransactionInputSchema,
      output: CreateTransactionOutputSchema,
    },

    // UI configs
    "@get/api/ui-configs": {
      output: GetUIConfigOutputSchema,
    },
    "@get/api/ui-configs/storefront/:slug": {
      params: GetStorefrontUIConfigParamsSchema,
      output: GetStorefrontUIConfigOutputSchema,
    },
    "@post/api/ui-configs": {
      input: CreateUIConfigInputSchema,
      output: CreateUIConfigOutputSchema,
    },
    "@delete/api/ui-configs": {
      output: DeleteUIConfigOutputSchema,
    },

    // Banks
    "@get/api/banks": {
      query: GetAllBanksQuerySchema,
      output: GetAllBanksOutputSchema,
    },

    // Checkout
    "@post/api/checkout/web": {
      input: CreateCheckoutInputSchema,
      output: CreateWebCheckoutOutputSchema,
    },
    "@post/api/checkout/pos": {
      input: CreateCheckoutInputSchema,
      output: CreatePosCheckoutOutputSchema,
    },

    // Country
    "@get/api/country": {
      query: GetAllCountriesQuerySchema,
      output: GetAllCountriesOutputSchema,
    },

    // Cart
    "@get/api/cart": {
      query: GetAllCartsQuerySchema.optional(),
      output: GetAllCartsOutputSchema,
    },
    "@get/api/cart/:id": {
      params: GetCartParamSchema,
      output: GetCartOutputSchema,
    },
    "@post/api/cart": {
      input: BaseCreateCartInputSchema,
      output: CreateCartOutputSchema,
    },
    "@put/api/cart/:id": {
      params: UpdateCartParamSchema,
      input: UpdateCartInputSchema,
      output: UpdateCartOutputSchema,
    },
    "@delete/api/cart/:id": {
      params: DeleteCartParamSchema,
      output: DeleteCartOutputSchema,
    },
    "@post/api/cart/item": {
      input: CreateCartItemInputSchema,
      output: CreateCartItemOutputSchema,
    },
    "@post/api/cart/item/increment": {
      input: IncrementCartItemInputSchema,
      output: IncrementCartItemOuputSchema,
    },
    "@post/api/cart/item/decrement": {
      input: DecrementCartItemInputSchema,
      output: DecrementCartItemOuputSchema,
    },
    "@delete/api/cart/item/:id": {
      params: DeleteCouponParamSchema,
      output: DeleteCartItemOutputSchema,
    },
  },
  { strict: true },
);

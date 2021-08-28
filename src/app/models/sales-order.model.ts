import { TrnSalesOrderItemModel } from "./trn-sales-order-item.model";
import { TrnSalesOrderModel } from "./trn-sales-order.model";

export class SalesOrder {
    Id: number;
    SalesOrder: TrnSalesOrderModel;
    Items: TrnSalesOrderItemModel[];
}


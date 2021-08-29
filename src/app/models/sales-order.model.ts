import { TrnSalesOrderItemModel } from "./trn-sales-order-item.model";
import { TrnSalesOrderModel } from "./trn-sales-order.model";

export class SalesOrder {
    Id: number = 0;
    SalesOrder: TrnSalesOrderModel = new TrnSalesOrderModel();
    Items: TrnSalesOrderItemModel[] = [];
}



export class SalesOrder {
    Id: number;
    SalesOrder: SalesOrderModel;
    Items: SalesOrderItemModel[];
}

export class SalesOrderModel {
    Id: number = 0;
    BranchManualCode: string = "";
    BranchName: string = "";
    CurrencyId: number = 0;
    CurrencyManualCode: string = "";
    ExchangeRate: number = 0;
    ExchangeCurrency: string = "";
    ExchangeCurrencyManualCode: string = "";
    SONumber: string = "";
    SODate: Date = new Date();
    ManualNumber: string = "";
    DocumentReference: string = "";
    CustomerId: number = 0;
    CustomerName: string = "";
    TermId: number = 0;
    DiscountId: number = 0;
    DiscountRate: number = 0;
    DateNeeded: Date = new Date();
    Remarks: string = "";
    SoldByUserId: number = 0;
    SoldByUserFullname: string = "";
    PreparedByUserId: number = 0;
    PreparedByUserFullname: string = "";
    CheckedByUserId: number = 0;
    CheckedByUserFullname: string = "";
    ApprovedByUserId: number = 0;
    ApprovedByUserFullname: string = "";
    Amount: number = 0;
    Status: string = "";
    IsCancelled: boolean = false;
    IsPrinted: boolean = false;
    IsLocked: boolean = false;
    CreatedByUserFullname: string = "";
    CreatedDateTime: string = "";
    UpdatedByUserFullname: string = "";
    UpdatedDateTime: string = "";
}

export class SalesOrderItemModel {
    Id: number = 0;
    SOId: number = 0;
    ItemId: number = 0;
    ItemManualCode: string = "";
    ItemSKUCode: string = "";
    ItemBarCode: string = "";
    ItemDescription: string = "";
    ItemInventoryId: number = 0;
    ItemInventoryCode: string = "";
    Particulars: string = "";
    Quantity: number = 0;
    UnitId: number = 0;
    Price: number = 0;
    DiscountId: number = 0;
    DiscountRate: number = 0;
    DiscountAmount: number = 0;
    NetPrice: number = 0;
    Amount: number = 0;
    VATId: number = 0;
    VATRate: number = 0;
    VATAmount: number = 0;
    WTAXId: number = 0;
    WTAXRate: number = 0;
    WTAXAmount: number = 0;
    LineTimeStamp: string = "";
}
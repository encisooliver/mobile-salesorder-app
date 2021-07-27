export class MstArticleItemModel {
    Id: number = 0;
    ArticleId: number = 0;
    ArticleCode: string = "";
    ArticleManualCode: string = "";
    ArticleParticulars: string = "";
    SKUCode: string = "";
    BarCode: string = "";
    Description: string = "";
    UnitId: number = 0;
    Category: string = "";
    IsInventory: boolean = false;
    ArticleAccountGroupId: number = 0;
    ArticleAccountGroupName: string = "";
    AssetAccountId: number = 0;
    AssetAccountManualCode: string = "";
    AssetAccountName: string = "";
    SalesAccountId: number = 0;
    SalesAccountManualCode: string = "";
    SalesAccountName: string = "";
    CostAccountId: number = 0;
    CostAccountManualCode: string = "";
    CostAccountName: string = "";
    ExpenseAccountId: number = 0;
    ExpenseAccountManualCode: string = "";
    ExpenseAccountName: string = "";
    Price: number = 0;
    RRVATId: number = 0;
    SIVATId: number = 0;
    WTAXId: number = 0;
    Kitting: string = "";
    ProductionCost: number = 0;
    IsLocked: boolean = false;
    CreatedByUserFullname: string = "";
    CreatedDateTime: string = "";
    UpdatedByUserFullname: string = "";
    UpdatedDateTime: string = "";
    DateAcquired: Date = new Date();
    SalvageValue: number = 0;
    UsefulLife: number =0;
}
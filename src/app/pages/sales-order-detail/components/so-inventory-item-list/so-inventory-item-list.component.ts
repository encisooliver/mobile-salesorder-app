import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-so-inventory-item-list',
  templateUrl: './so-inventory-item-list.component.html',
  styleUrls: ['./so-inventory-item-list.component.scss'],
})
export class SoInventoryItemListComponent implements OnInit {

  token: string = "";
  branchId: number = 0;
  constructor(
    private mstArticleItemService: MstArticleItemService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this.storage.get("access_token").then(
      result => {
        let token = result;
        console.log(token);
        if (token) {
          this.token = token;
        }
      }
    )

    this.storage.get("branchId").then(
      result => {
        let branchId = result;
        console.log(branchId);
        if (branchId) {
          this.branchId = branchId;
        }
      }
    )
  }

  public articleItemListPageIndex: number = 15;
  public itemListSkip: number = 0;
  public itemListTake: number = 15;
  public searchItemKeywords: string = "";
  public searchItemColumn: string = "All"


  public isButtonAddArticleItemDisabled: boolean = false;
  public items: any[] = [];
  public getArticleItemList(): void {

    let column = this.searchItemColumn;
    let skip = this.itemListSkip;
    let take = this.itemListTake;
    let keywords = this.searchItemKeywords;

    this.mstArticleItemService.getPaginatedArticleItemList(this.token, this.branchId, column, skip, take, keywords).subscribe(
      data => {

        setTimeout(() => {
          if (data["length"] > 0) {
            for (let i = 0; i <= data["length"] - 1; i++) {
              this.items.push({
                Id: data[i].Id,
                ArticleId: data[i].ArticleId,
                ArticleItem: data[i].ArticleItem,
                BranchId: data[i].BranchId,
                Branch: data[i].Branch,
                InventoryCode: data[i].InventoryCode,
                Quantity: data[i].Quantity,
                Cost: data[i].Cost
              });
            }
          }
        }, 500);

        console.log(this.items);

      }
    );
  }
  async close() {
    await this.modalCtrl.dismiss({ status: 200 });
  }
  ngOnInit() {
    setTimeout(() => {
      this.getArticleItemList();
    }, 500);
  }

}

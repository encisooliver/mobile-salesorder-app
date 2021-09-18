import { Component, OnInit } from '@angular/core';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { TrnPurchaseRequestItemService } from 'src/app/services/trn-purchase-request-item/trn-purchase-request-item.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  token: string = "";
  branchId: number = 0;


  articleItemListPageIndex: number = 15;
  itemListSkip: number = 0;
  itemListTake: number = 15;
  searchItemKeywords: string = "";
  searchItemColumn: string = "All"

  isButtonAddArticleItemDisabled: boolean = false;
  items: any[] = [];

  constructor(
    private mstArticleItemService: MstArticleItemService,
    private storage: Storage
  ) {
  }

  downloadItemList(): void {
    this.mstArticleItemService.getItemList(this.token).subscribe(
      data => {
        let result = data;
        if(result[0]==true){

        }
      }
    );
  }

  getItemList(){
    this.storage.get("items").then(
      result => {
        let items = result;
        console.log(items);
        if (items) {
          this.items = items;
        }
      }
    );
  }

  ngOnInit() {
    this.storage.get("access_token").then(
      result => {
        let token = result;
        console.log(token);
        if (token) {
          this.token = token;
          this.getItemList();
        }
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../settings/app-settings';
import { ItemModel } from '../../models/item.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MstArticleItemService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
  ) {
  }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;

  public getPaginatedArticleItemList(token: string, branchId:number, column: string, skip: number, take: number, keywords: string): Observable<any[]> {
    
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Observable<any[]>((observer) => {
      let itemListObservableArray = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstArticleItemInventoryAPI/list/paginated/" + 3 + "/" + column + "/" + skip + "/" + take + "?keywords=" + keywords, option).subscribe(
        response => {
          let results = response;
          console.log(results);
          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              itemListObservableArray.push({
                Id: results[i].Id,
                ArticleId: results[i].ArticleId,
                ArticleItem: results[i].ArticleItem,
                BranchId: results[i].BranchId,
                Branch: results[i].Branch,
                InventoryCode: results[i].InventoryCode,
                Quantity: results[i].Quantity,
                Cost: results[i].Cost
              });
            }
          }

          observer.next(itemListObservableArray);
          observer.complete();
        }
      );
    });
  }
 
}

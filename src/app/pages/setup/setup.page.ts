import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MstArticleItemService } from 'src/app/services/mst-article-item/mst-article-item.service';
import { SetupService } from 'src/app/services/setup/setup.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

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
    private setupService: SetupService,
    private storage: Storage,
    private toastService: ToastService,
  ) {
  }

  // setup(): void {
  //   this.setupService.getSetup(this.token).subscribe(
  //     data => {
  //       let result = data;
  //       if(result[0]==true){
  //         this.toastService.success('Setup successfully');
  //       }
  //     }
  //   );
  // }

  ngOnInit() {
    // this.storage.get("access_token").then(
    //   result => {
    //     let token = result;
    //     if (token) {
    //       this.token = token;
    //       this.setup();
    //     }
    //   }
    // );
  }
}

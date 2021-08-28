import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SalesOrder } from 'src/app/models/sales-order.model';
const SO_KEY = "sales_order";
@Injectable({
  providedIn: 'root'
})
export class SysStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage.get(key);
  }

  addSO(so: SalesOrder): Promise<any> {
    return this.storage.get(SO_KEY).then((so_list: SalesOrder[]) => {
      if (so_list) {
        so_list.push(so);
        return this.storage.set(SO_KEY, so_list);
      } else {
        return this.storage.set(SO_KEY, [so]);
      }
    });
  }

  getUsers(): Promise<SalesOrder[]> {
    return this.storage.get(SO_KEY);
  }

  getUserDetail(id: String): Promise<SalesOrder> {
    let so: SalesOrder;
    return this.storage.get(SO_KEY).then(
      response => {
        var so_list = response;

        if (so_list["length"] > 0) {
          for (var i = 0; i <= so_list["length"] - 1; i++) {
            if (so_list[i].Id == id) {
              so = so_list[i];
              break;
            }
          }
        }

        return so;
      });
  }

  updateSO(sa: SalesOrder): Promise<any> {
    return this.storage.get(SO_KEY).then((so_list: SalesOrder[]) => {
      if (!so_list || so_list.length === 0) {
        return null;
      }
      let newUsers: SalesOrder[] = [];
      for (let i of so_list) {
        if (i.Id === sa.Id) {
          newUsers.push(sa);
        } else {
          newUsers.push(i);
        }
      }

      return this.storage.set(SO_KEY, newUsers);
    });
  }

  deleteUser(id: number) {
    return this.storage.get(SO_KEY).then((so_list: SalesOrder[]) => {
      if (!so_list || so_list.length === 0) {
        return null;
      }
      let toKeep: SalesOrder[] = [];

      for (let so of so_list) {
        if (so.Id !== id) {
          toKeep.push(so);
        }
      }

      return this.storage.set(SO_KEY, toKeep);
    });
  }
}

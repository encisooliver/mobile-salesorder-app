import { Injectable } from '@angular/core';
import { SalesOrder } from '../../software-models/sales-order.model';

const SO_KEY = "sales_order";

@Injectable({
  providedIn: 'root'
})
export class LocalSalesOrderService {

  constructor(private storage: Storage) { }

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
    let so: SalesOrder[];
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

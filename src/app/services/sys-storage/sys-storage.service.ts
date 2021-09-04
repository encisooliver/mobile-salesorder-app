import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SalesInvoice } from 'src/app/models/sales-invoice.model';
import { SalesOrder } from 'src/app/models/sales-order.model';
const SO_KEY = "sales_order";
const SI_KEY = "sales_invoice";
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

  // SALES SALES ORDER
  addSO(so: SalesOrder): Promise<SalesOrder> {
    let new_so: SalesOrder = {
      Id: 0,
      SalesOrder: so.SalesOrder
    }
    console.log(new_so);
    return this.storage.get(SO_KEY).then((so_list: SalesOrder[]) => {
      console.log(so_list);
      if (so_list) {
        let newId = so_list.length + 1;
        new_so.Id = newId;
        so_list.push(new_so);
        this.storage.set(SO_KEY, so_list);
        return new_so;
      } else {
        let newId = 1;
        new_so.Id = newId;
        this.storage.set(SO_KEY, [new_so]);
        return new_so;
      }
    });
  }

  getSOs(): Promise<SalesOrder[]> {
    return this.storage.get(SO_KEY);
  }

  getSODetail(id: String): Promise<SalesOrder> {
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

  updateSO(sa: SalesOrder): Promise<SalesOrder> {
    return this.storage.get(SO_KEY).then((so_list: SalesOrder[]) => {
      if (!so_list || so_list.length === 0) {
        return null;
      }
      let SOs: SalesOrder[] = [];
      for (let i of so_list) {
        if (i.Id === sa.Id) {
          SOs.push(sa);
        } else {
          SOs.push(i);
        }
      }

      return this.storage.set(SO_KEY, SOs);
    });
  }

  deleteSO(id: number) {
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
  
  // SALES INVOICE
  addSI(so: SalesInvoice): Promise<SalesInvoice> {
    let new_si: SalesInvoice = {
      Id: 0,
      SalesInvoice: so.SalesInvoice
    }
    console.log(new_si);
    return this.storage.get(SI_KEY).then((si_list: SalesInvoice[]) => {
      console.log(si_list);
      if (si_list) {
        let newId = si_list.length + 1;
        new_si.Id = newId;
        this.storage.set(SI_KEY, si_list);
        return new_si;
      } else {
        let newId = 1;
        new_si.Id = newId;
        this.storage.set(SI_KEY, [new_si]);
        return new_si;
      }
    });
  }

  getSIs(): Promise<SalesInvoice[]> {
    return this.storage.get(SO_KEY);
  }

  getSIDetail(id: String): Promise<SalesInvoice> {
    let so: SalesInvoice;
    return this.storage.get(SO_KEY).then(
      response => {
        var si_list = response;

        if (si_list["length"] > 0) {
          for (var i = 0; i <= si_list["length"] - 1; i++) {
            if (si_list[i].Id == id) {
              so = si_list[i];
              break;
            }
          }
        }

        return so;
      });
  }

  updateSI(si: SalesInvoice): Promise<SalesInvoice> {
    return this.storage.get(SO_KEY).then((si_list: SalesInvoice[]) => {
      if (!si_list || si_list.length === 0) {
        return null;
      }
      let SIs: SalesInvoice[] = [];
      for (let i of si_list) {
        if (i.Id === si.Id) {
          SIs.push(si);
        } else {
          SIs.push(i);
        }
      }

      return this.storage.set(SI_KEY, SIs);
    });
  }

  deleteSI(id: number) {
    return this.storage.get(SI_KEY).then((si_list: SalesInvoice[]) => {
      if (!si_list || si_list.length === 0) {
        return null;
      }
      let toKeep: SalesInvoice[] = [];

      for (let si of si_list) {
        if (si.Id !== id) {
          toKeep.push(si);
        }
      }

      return this.storage.set(SI_KEY, toKeep);
    });
  }
}

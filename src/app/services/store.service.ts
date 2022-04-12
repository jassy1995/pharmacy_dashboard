import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRequest } from 'src/app/models/requests';

interface IPagination {
  end: boolean;
  page: number;
}

interface IStudentsState {
  pagination: IPagination | null;
  items: IRequest[] | null;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _approvedRequest: IStudentsState = { pagination: null, items: null, total: 0 };

  public $approvedRequest = new BehaviorSubject<IStudentsState>(this._approvedRequest);

  public get approvedRequest(): any {
    return this._approvedRequest;
  }

  private _pendingRequest: IStudentsState = { pagination: null, items: null, total: 0 };

  public $pendingRequest = new BehaviorSubject<IStudentsState>(this._pendingRequest);

  public get pendingRequest(): any {
    return this._pendingRequest;
  }

  setState(key: string, value: any, notify = false) {
    // @ts-ignore
    this[`_${ key }`] = value;
    if (notify) {
      // @ts-ignore
      this[`$${ key }`].next(this[key]);
    }
  }

  reset() {
    this._approvedRequest = { pagination: null, items: null, total: 0 };
    this.$approvedRequest.next(this._approvedRequest);
    this._pendingRequest = { pagination: null, items: null, total: 0 };
    this.$pendingRequest.next(this._approvedRequest);
  }
}

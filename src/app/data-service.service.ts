import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { User, BidEntity as Bid } from './Models/userModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'Origin' })
};

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private httpClient: HttpClient) { }

  public requestDataFromServer(): Observable<any[]> {
    const response1 = this.httpClient.get<User[]>('http://team-scale.com/jsonData/users.json');
    const response2 = this.httpClient.get<Bid[]>('http://team-scale.com/jsonData/bids.json');
    return forkJoin([response1, response2]);
  }

  public validUsers(users: User[]): User[] {
    return users.filter((user) => user.Age > 18 && user.Age < 60);
  }

  public validBids(bids: Bid[], validUsers: User[], minValue: number, maxValue: number): number {
    const trackerObject = {}, validMapper = {};
    const filteredBids = bids.filter((bid) => {
      if (+bid.Bid <= minValue || +bid.Bid >= maxValue) {
        return false;
      }
      const userExist = validUsers.some((ele) => (ele.id === bid.UserID));
      if (userExist) {
        if (!trackerObject[bid.UserID]) {
          trackerObject[bid.UserID] = bid.Branch;
          validMapper[bid.UserID] = 1;
          return true;
        } else if (!(trackerObject[bid.UserID] === bid.Branch)) {
          delete validMapper[bid.UserID];
          return false;
        }
      }
      return false;
    });
    return Object.keys(validMapper).length || 0;
  }

}

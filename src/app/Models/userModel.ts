export class User {
 /// {"id":"5215","FirstName":"Sophia","LastName":"Jones","Gender":"Female","State":"FL","Age":"33"}
  constructor(public id: number,
    public FirstName: string,
     public LastName: string,
      public Gender: string,
       public State: string,
        public Age: number) {}

}

export class BidEntity {
  /// {"id":"16","UserID":"5309","Date":"2018-05-01","Bid":"95","Branch":"FL","Token":"JD6dv2mg"}
   constructor(public id: number,
     public UserID: number,
      public Date: string,
       public Bid: number,
        public Branch: string,
         public Token: string) {}
 }

namespace sap.capire.bookshop;

using { sap.capire.bookshop as my} from '../db/schema';

service OrdersService  {
  entity Orders as select from my.Orders;
}

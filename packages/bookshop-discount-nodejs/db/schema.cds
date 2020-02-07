namespace sap.capire.bookshop;
using { sap.capire.bookshop.Orders } from '@sap/capire-bookshop/db/schema';

extend Orders with {
  discount : Integer;
}
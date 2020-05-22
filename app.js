(function () {
'use strict';
var shoppingListtobuy = [
  {
    name: "Juice",
    quantity: "3"
  },
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Bread",
    quantity: "1"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Cheese",
    quantity: "3"
  }
];
angular.module('ShoppingListCheckOff.', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var showList = this;
  showList.boughtMsg="Nothing bought yet!";
  showList.items = ShoppingListService.getItems();


  showList.removeItem = function (itemIndex) {
    try
    {
      ShoppingListService.removeItem(itemIndex);
      showList.boughtMsg = "";
    }
    catch(error)
    {
      showList.errorMessage=error.message;
    }
  };


}
AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var boughtList = this;
  boughtList.items=ShoppingListService.getBoughtItems();

}

function ShoppingListService() {
  var service = this;


  // List of shopping items
  var items = shoppingListtobuy;
  var boughtItems=[];

  service.addItem = function (itemindex) {
   var newitem = {
      name: items[itemindex].name,
      quantity: items[itemindex].quantity
    };

    boughtItems.push(newitem);
  };

  service.removeItem = function (itemIndex) {
    service.addItem(itemIndex);
    items.splice(itemIndex, 1);
    if(items.length==0)
    {
        throw new Error("Everything is bought!");
    }
  };

  service.getItems = function () {
    return items;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };

}


})();

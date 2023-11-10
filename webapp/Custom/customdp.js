sap.ui.define([
    "sap/m/Select",
    "sap/ui/core/Item"
], function (Select, Item) {
    "use strict";
    
    return Select.extend("ndbs.Z_JobCard.Custom.customdp", {
        metadata: {
            properties: {
                dataString: { type: "string" }
            }
        },

        init: function () {
            Select.prototype.init.apply(this, arguments);
            this.attachModelContextChange(this._updateItems, this);
        },

        _updateItems: function () {
            this.removeAllItems();
            var dataString = this.getDataString();
            if (dataString) {
                var items = dataString.split(",");
                items.forEach(function (item) {
                    this.addItem(new Item({ text: item }));
                }, this);
            }
        }
    });
});
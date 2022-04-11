/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'underscore',
    'uiRegistry',
    'rjsResolver',
    'Magento_Ui/js/dynamic-rows/dynamic-rows-grid'
], function (_, registry, resolver, dynamicRowsGrid) {
    'use strict';

    return dynamicRowsGrid.extend({

        deleteRecord: function (index, recordId) {
            this._super();
            this.resetPosition();
        },

        resetPosition() {
            let self = this,
                position = 0;
            _.filter(this.elems(), function (elem, index) {
                if(index === 0) {
                    position = ((self.currentPage() - 1) * self.pageSize) + 1;
                }
                _.filter(elem.elems(),function(childElem){
                    if(childElem.index == 'position'){
                        childElem.value(position);
                    }
                })
                position++;
            });
        },

        nextPage: function () {
            this._super();
            resolver(function () {
                if (this.elems().length) {
                    this.resetPosition();
                }
            }, this);
        }
    });
});

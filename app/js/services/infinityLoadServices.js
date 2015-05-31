'use strict';

SocialNetwork.factory('infinityLoad', function($http, authentication, noteServices, baseServiceUrl) {
    var InfinityLoad = function(urlPath) {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.serviceUrl = baseServiceUrl + urlPath;
    };

    InfinityLoad.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        $http.get(this.serviceUrl + '?StartPostId=' + this.after + '&PageSize=' + 3, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }

                if (data.length) {
                    this.after = this.items[this.items.length - 1].id;
                }

                this.busy = false;
            }.bind(this))
            .error(function (serverError) {
                noteServices.showError("Unsuccessful Edited Profile!", serverError);
            });
    };

    InfinityLoad.addInTheBeginning = function(data) {
        this.items.unshift(data);
    };

    return InfinityLoad;
});
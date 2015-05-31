'use strict';

SocialNetwork.factory('infinityLoad', function($http, authentication, noteServices, baseServiceUrl) {
    var serviceUrl = baseServiceUrl + '/me';

    var InfinityLoad = function() {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    InfinityLoad.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        $http.get(serviceUrl + '/feed?StartPostId=' + this.after + '&PageSize=' + 3, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after = this.items[this.items.length - 1].id;
                this.busy = false;
            }.bind(this))
            .error(function (serverError) {
                noteServices.showError("Unsuccessful Edited Profile!", serverError);
            });
    };

    return InfinityLoad;
});
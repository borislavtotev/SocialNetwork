SocialNetwork.controller('UploadController',function ($scope, fileReader) {
    $scope.getFile = function (e) {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                var je = $(e);
                var id = je.attr('id');
                $scope[id] = result;
            });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });
});
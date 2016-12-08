/**
 * Created by wenyuan on 2016/11/22.
 */

/*
* 数据解析 配置到界面上 
* */

(function () {
    var detailModule = angular.module('app.movieDetail',[]);
    detailModule.controller('movieDetailController',function ($scope,$rootScope,URLConfig,$routeParams,$http) {

        var movieId = $routeParams.movieId;
        var fullUrl = URLConfig.appURL + 'subject/' + movieId + '?callback=movieDetailCallBack';

        $http.jsonp(fullUrl).success(function () {
            console.log("请求成功");
        });

        window.movieDetailCallBack = function (jsonData) {
            $scope.movie = jsonData;
        };

        $rootScope.navTitle = "电影详情";
    })
}())
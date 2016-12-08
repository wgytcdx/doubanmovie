/**
 * Created by wenyuan on 2016/11/22.
 */

/*
* 数据解析 配置到界面上 
* */

(function () {
    var modulelist = angular.module('app.movieList',[]);
    // 需要的服务 $scope $rootScope URLConfig $http $routeParams
    modulelist.controller('movieListController',function ($scope,$rootScope,URLConfig,$http,$routeParams,$route) {

    //    网络访问 --》 获取数据 --》解析数据 --》配置到界面

    //    网络访问 参数 url count

        var count = URLConfig.page_size;
        var url = URLConfig.appURL;

        var type = $routeParams.type || 'in_theaters';
        var page = $routeParams.page || 1;

        $scope.currentPage = parseInt(page);
        $scope.size = count;
        $scope.loading = true;

        var start = (page - 1) * count;

    //    1、拼接url
        var fullUrl = url + type + '?count=' + count +
            '&start=' + start + "&callback=movieListCallBack";

        console.log('请求路径' + fullUrl);

    //    2、请求
        $http.jsonp(fullUrl).error(function () {
            // console.log("请求错误");
        })

    //    3、定义回调函数 注意这个方法要定义在window里面否则找不到
        window.movieListCallBack = function (jsonData) {
            console.log(jsonData);

            $scope.title = jsonData.title;
            $scope.total = jsonData.total;
            $scope.movies = jsonData.subjects;

            $scope.loading = false;
        }

        $rootScope.navTitle = '电影列表';

    //    4、监听页面切换
        $scope.$watch('currentPage',function (newV,oldV) {
            console.log(newV,oldV);
            $scope.flag = true;
            if(newV !== page)
            {
                $route.updateParams({
                    page : newV
                })
                // $scope.flag = false;
            }
        })
    })
}())


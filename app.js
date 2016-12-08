/**
 * Created by wenyuan on 2016/11/22.
 */

/*
*  界面的逻辑结构
*  angular 模板行为
*  路由表的创建
*  controller 里获取数据配置到路由当中
* */

var app = angular.module('app',
    ['ngRoute',
    'app.movieList',
    'app.movieDetail',
    'ui.bootstrap']);

app.directive('selectLink',function () {
    var item = [];
    return function (scope,element,attr) {
    //    点击切换 状态
        item.push(element);
        element.bind('click',function () {
            
            // item.forEach(function (it) {
            //     // element == 1
            //     if(it == element)
            //     {
            //         it.parent().addClass("active");
            //     }else{
            //         it.parent().removeClass("active");
            //     }
            // })
            item.forEach(function (e) {
                e.parent().removeClass("active");
            })
            
            element.parent().addClass('active')
        })
    }
})

// HTMLCollection Array 区别

//配置路由表

app.config(function ($routeProvider) {
    $routeProvider.when('/list/:type/:page?',{
        templateUrl : 'movie/movie-list.html',
        controller : 'movieListController'
    }).when('/detail/:movieId',{
        templateUrl : 'movie/movie-detail.html',
        controller : 'movieDetailController'
    }).otherwise({
        redirectTo: 'list/in_theaters/1'
    })
})

//  配置常量服务 访问的url地址 
app.constant('URLConfig',{
    page_size : 20,
    appURL : "https://api.douban.com/v2/movie/"
})
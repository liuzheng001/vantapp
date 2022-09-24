// src/mock/index.js
//后端模拟数据
import Mock from 'mockjs'  //导入mockjs

//使用Mock下面提供的mock方法进行需要模拟数据的封装
//参数1，是需要拦截的完整请求地址，参数2，是请求方式，参数3，是请求的模拟数据
/*const testData = Mock.mock('http://192.168.0.158:8080/test','get',{
    status:200, //请求成功状态码
    dataList:[1,2,3,4,5,6,7,8,9,10] //模拟的请求数据
})*/


Mock.mock("http://localhost:8080/test", "post", (options) => {
    const params = JSON.parse(options.body)
    if (params.id == 330100 || params.id ==  330200) {
        return ({
            code: "0",
            status: 200,
            dataList: [{title:"二级no3"},{title:"二级no4"},{title:"二级no5"}]
            //模拟的请求数据
            // data: tableList,
        })
    }else{
        return ({
            code: "0",
            status: 200,
            dataList: [{title: "no1"}, {title: "no2"}, {title: "no3"}]
            //模拟的请求数据
            // data: tableList,
        })
    }
});


//导出
// export default testData

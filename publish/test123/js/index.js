function transObject(data,keys){
    let table = {},
        res = []
    for(let i = 0; i < data.length; i++){
        let arr = res,
            cur = table
        for(let j = 0; j < keys.length; j++){
            let key = keys[j],
                filed = data[i][key]
            if(!cur[filed]){
                let pusher = {
                    value:filed
                },temp
                if(j != (key.length - 1)){
                    temp = []
                    pusher.children = temp
                }
                cur[filed] = {$$pos:arr.push(pusher)-1}
                cur = cur[filed]
                arr = temp
            }else{
                cur = cur[filed]
                arr = arr[cur.$$pos].children
            }
        }
    }
    return res
}

var data = [{
    province:'浙江',
    city:'杭州',
    name:'西湖'
},{
    province:'四川',
    city:'成都',
    name:'锦里'
},{
    province:'四川',
    city:'成都',
    name:'方所'
},{
    province:'四川',
    city:'阿坝',
    name:'九寨沟'
}]
var keys = ['province','city','name']
console.log(transObject(data,keys))
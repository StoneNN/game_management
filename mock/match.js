
import _ from 'lodash';
import Mock, {Random} from 'mockjs';

  let dataSource = [];
  for (let i = 0; i < 7; i += 1) {
    var data = 
    dataSource.push(
      Mock.mock({
        key:i+'a',
        'name|1':['石家庄桥牌协会','北京桥牌协会','宏鸿集团','恒大桥牌俱乐部','腾讯科技有限公司','华为桥牌俱乐部','邢台桥牌协会'],
        type:Mock.Random.integer(0,1,2),
        owner:Mock.Random.cname(),
        'phone|1':/^1[0-9]{10}$/ , 
        address:Random.county(true)
     }));
    }
 
    // console.log('-------dataSource-------',dataSource);
  
    export default {
      'POST /api/match': (req,res)=>{
           console.log('------ req.body ------',req.body);
           const {name,type,owner,phone,address,method,deleteKeys=[],key} = req.body;
          if(method==='search'){
             let searchData;
               if(name){ 
                  console.log('search -------',name)
                  searchData = dataSource.filter((item)=>(item.name.indexOf(name)!= -1) )
                  console.log('search_status ------',searchData)
                  if(searchData){
                  res.send(searchData); 
                }
              // res.json(searchData)
              // return;
              }
              // if(status){
              //     searchData = dataSource.filter( (item)=>(item.status == status ) ) ; 
              // }
              // res.json(searchData)
              // return;
           }
          else if(method==='delete'){
            console.log(2)
              if(deleteKeys){ 
                _.remove(dataSource, function(item) {
                  return deleteKeys.indexOf(item.key) > -1;
                });
              }
              res.json(dataSource)
              return;
           }
          else if(method==='add'){
            console.log(2)
                dataSource.unshift({
                key: new Date().getTime(),
                name,
                type,
                owner,
                phone,
                address
              })
                res.json(dataSource)
                return;
           }
          else if(method==='edit'){
            console.log(2)
                dataSource.forEach((item,index)=>{
                    if(item.key == key){
                      dataSource[index] = {key,name,type,owner,phone,address}
                    }
                })
                res.json(dataSource)
                return;
           }
          res.json(dataSource);
    }
  }
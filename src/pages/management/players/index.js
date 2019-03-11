/*
 * @Author: Nxf
 * @Description:
 * @Date: 2019-03-02 16:30:29
 * @LastEditTime: 2019-03-02 17:11:20
 */

import React, { Component }  from "react";
import { Table, Divider } from "antd";


class PlayersTableBlock extends Component{


    render(){
      const columns = [{
        title:'会员号',
        dataIndex:'memberNo',
        key:'memberNo',
        align:'center'
      },{
        title:'昵称',
        dataIndex:'nickName',
        key:'nickName',
        align:'center'
      },{
        title:'真实姓名',
        dataIndex:'realName',
        key:'realName',
        align:'center'
      },{
        title:'性别',
        dataIndex:'gender',
        key:'gender',
        align:'center'
      },{
        title:'电话',
        dataIndex:'phoneNo',
        key:'phoneNo',
        align:'center'
      },{
        title:'操作',
        dataIndex:'newsManage',
        key:'newsManage',
        align:'center',
        render:(text,record) =>(
          <span>
            <a href= "# ">编辑</a>
            <Divider type="vertical"></Divider>
            <a href= "# ">删除</a>
          </span>
        )
      }];
      const dataSource =[{
        key:'100000',
        memberNo:'100000',
        nickName:'麦克',
        realName:'张无忌',
        gender:'男',
        phoneNo:'13838384383'
      },{
        key:'100001',
        memberNo:'100001',
        nickName:'katty',
        realName:'王语嫣',
        gender:'女',
        phoneNo:'11012011943'
      },{
        key:'100002',
        memberNo:'100002',
        nickName:'杰克逊',
        realName:'林冲',
        gender:'男',
        phoneNo:'12011019856'
      },{
        key:'100003',
        memberNo:'100003',
        nickName:'晴雯',
        realName:'扈三娘',
        gender:'女',
        phoneNo:'11289356725'
      },{
        key:'100004',
        memberNo:'100004',
        nickName:'流浪者',
        realName:'杨过',
        gender:'男',
        phoneNo:'13935545637'
      },];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
      };
      return(

            <Table
              dataSource={dataSource}
              columns={columns}
              rowSelection={rowSelection}
            ></Table>
        )
    }
}


export default PlayersTableBlock;

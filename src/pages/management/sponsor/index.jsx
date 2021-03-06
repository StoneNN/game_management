/*
 * @Author: Nxf
 * @Date: 2019-03-04 10:18:36
 * @Last Modified by: Nxf
 * @Last Modified time: 2019-03-09 16:39:51
 */
import React, { Component } from "react";
import { Table ,Form ,Input,Button,Select,Modal,Popconfirm,Divider} from 'antd';
import {connect} from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;



class SearchForm extends Component {

    constructor(props){
        super(props);
        this.state={

        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('------- search_value -------',values);
            if (!err) {
                this.props.dispatch({
                    type:'sponsor/search',
                    payload:values,
                })
            }
        });
    }
    handleFormReset = ()=>{
        this.props.form.resetFields();
        // this.props.handleFormReset();
        // console.log(this.props.handleFormReset());
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { handleFormReset } = this.props;
        console.log('----- SearchForm handleFormReset -----',handleFormReset);
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem label="主办方名称" >
                    {getFieldDecorator('name', { })( <Input placeholder="主办方名称"/>)}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    <Button type='primary' style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
                    </Button>
                </FormItem>
            </Form>)
    }

}

// @Form.create()
// @connect(({match})=>({match}))

SearchForm = Form.create()(SearchForm);
SearchForm = connect(({sponsor})=>({sponsor}))(SearchForm);



class TableList extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedRows : [],
            visible:false,
            isAdding:false,
            currentRowData:{}
        }
    }
    fetchData = () => {
        this.props.dispatch({
            type:'sponsor/fetch'
        })
    }
    componentDidMount(){
        this.fetchData()
    }
    onChange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRows);
        this.setState({
            selectedRows
        })
    }
    handleDelete= () => {
        const selectKeys = this.state.selectedRows.map((Row)=>(Row.key));
        console.log(selectKeys);
        this.props.dispatch({
            type:'sponsor/delete',
            payload:{deleteKeys:selectKeys}
        })
    }
    deleteOne = (deleteKey) => {
        console.log(deleteKey);
        this.props.dispatch({
            type:'sponsor/delete',
            payload:{deleteKeys:[deleteKey]}
        })
    }
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }
    showEditModal = (record) =>{
        console.log(record);
        this.setState({
            isAdding:false,
            visible: true,
            currentRowData:record
        })
    }
    showAddModal = () =>{
        this.setState({
            isAdding:true,
            visible: true,
        })
    }
    handleEdit = () => {
        const { dispatch,form } = this.props;
        const {currentRowData} = this.state;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                visible: false,
            });
            dispatch({
                type:'sponsor/edit',
                payload:{...currentRowData, ...values}
            })
    })
    }

    handleAdd = () => {
        const { dispatch,form } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                visible: false,
            });
            console.log(values)
            dispatch({
                type:'sponsor/add',
                payload:values
            })
        })
    }

    render(){
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            align:'center'
        }, {
            title: '类型',
            dataIndex: 'type',
            align:'center',
            render: val => (val === 0 ? '协会':'俱乐部'),
        }, {
            title: '负责人',
            dataIndex: 'owner',
            align:'center',
        },{
            title: '电话',
            dataIndex: 'phone',
            align:'center',
        },{
            title: '地址',
            dataIndex: 'address',
            align:'center',
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align:'center',
            render: (text,record) => {
                console.log(record.key);
                return (<div>
                            <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => {this.deleteOne(record.key)}} >
                            <a href="# ">删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="# " onClick={()=>this.showEditModal(record)}>编辑</a>
                        </div>)
            },
        }];

        const {sponsor:{list},form:{getFieldDecorator}} = this.props;
        console.log('-------- sponsor_props --------',this.props);
        const {visible,isAdding,currentRowData} = this.state;
        console.log('-------- this.state -------',this.state);
        console.log('------- currentRowData -------',currentRowData)
        const modalFooter =
        isAdding ? { okText: '添加', onOk: this.handleAdd, onCancel: this.handleCancel}
            : { okText: '保存', onOk: this.handleEdit, onCancel: this.handleCancel };

        const getModalContent = () => {
            if(isAdding){
                console.log('-------- isAdding-新建 --------');
                return (
                <Form >
                    <FormItem label="主办方名称" >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入主办方名称' }],
                    })(<Input placeholder="主办方名称" />)
                    }
                    </FormItem>
                    <FormItem label="主办方类型" >
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: '请输入主办方类型' }],
                    })(
                            <Select placeholder="请选择">
                                <Option value="0">协会</Option>
                                <Option value="1">俱乐部</Option>
                            </Select>)
                    }
                    </FormItem>
                    <FormItem label="负责人" >
                    {getFieldDecorator('owner', {
                        rules: [{ required: true, message: '请输入负责人姓名' }],
                    })(<Input placeholder="负责人姓名" />)
                    }
                    </FormItem>
                    <FormItem label="联系电话" >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入负责人联系电话' }],
                    })(<Input placeholder="负责人联系电话" />)
                    }
                    </FormItem>
                    <FormItem label="地址">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入地址' }]
                        })(<Input placeholder="主办方地址" />)}
                    </FormItem>
                </Form>
            );
            }else{
                console.log('-------- isAdding-编辑 --------');
                return (
                  <Form >
                    <FormItem label="主办方名称" >
                    {getFieldDecorator('name', {
                        initialValue:currentRowData.name,
                        rules: [{ required: true, message: '请输入主办方名称' }],
                    })(<Input placeholder="主办方名称" />)
                    }
                    </FormItem>
                    <FormItem label="主办方类型" >
                    {getFieldDecorator('type', {
                        initialValue:currentRowData.type === 0 ? '协会':'俱乐部',
                        rules: [{ required: true, message: '请输入主办方类型' }],
                    })(
                            <Select placeholder="请选择" style={{ width: '200px' }}>
                                <Option value="0">协会</Option>
                                <Option value="1">俱乐部</Option>
                            </Select>)
                    }
                    </FormItem>
                    <FormItem label="负责人" >
                    {getFieldDecorator('owner', {
                        initialValue:currentRowData.owner,
                        rules: [{ required: true, message: '请输入负责人姓名' }],
                    })(<Input placeholder="负责人姓名" />)
                    }
                    </FormItem>
                    <FormItem label="联系电话" >
                    {getFieldDecorator('phone', {
                        initialValue:currentRowData.phone,
                        rules: [{ required: true, message: '请输入负责人联系电话' }],
                    })(<Input placeholder="负责人联系电话" />)
                    }
                    </FormItem>
                    <FormItem label="地址">
                        {getFieldDecorator('address', {
                            initialValue:currentRowData.address,
                            rules: [{ required: true, message: '请输入地址' }]
                        })(<Input placeholder="主办方地址" />)}
                    </FormItem>
                  </Form>
                );
            }
        };

        return (
            <div>
                {/* 搜索框 */}
                <SearchForm handleFormReset={this.fetchData} />
                {/* 新建 & 批量删除 */}
                <div style={{ overflow:'hidden',lineHeight:'50px', height:'50px' }} >
                    <Button onClick={this.handleDelete} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                      批量删除
                    </Button>
                    <Button onClick={this.showAddModal} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                      新建
                    </Button>
                </div>
                {/* 数据表格 */}
                <Table
                    rowSelection={{onChange:this.onChange}}
                    dataSource={list}
                    columns={columns}
                />
                <Modal
                title={isAdding?'添加':'编辑'}
                width={400}
                cancelText='取消'
                destroyOnClose
                visible={visible}
                {...modalFooter}
                >
                    {getModalContent()}
                </Modal>
            </div>

        )
    }
}

// @Form.create()
// @connect(({match})=>({match}))

TableList = Form.create()(TableList);
TableList = connect(({sponsor})=>({sponsor}))(TableList);

export default TableList;

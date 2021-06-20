import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, Space, InputNumber } from 'antd';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import TableForm from './components/TableForm';
import styles from './style.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import {default as UUID} from "node-uuid";

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const fieldLabels = {
  name: 'Login',
  url: '仓库域名',
  owner: 'Server',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};
const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'user1',
    department: 'us03',
  },
  {
    key: '2',
    workId: '00002',
    name: 'user2',
    department: 'us01',
  },
  {
    key: '3',
    workId: '00003',
    name: 'user3',
    department: 'us02',
  },
];

const AdvancedForm = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState([]);

  const getErrorInfo = (errors) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;

    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = (fieldKey) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);

      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }

      const key = err.name[0];
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode;
            }

            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values) => {
    setError([]);
    dispatch({
      type: 'formAndadvancedForm/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.errorFields);
  };

  
  const uuid = UUID.v4(); 
  

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{
        members: tableData,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="Set follower and sender details.">
        <Card title="Follower Setup" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name}
                name="follower_login"
                rules={[
                  {
                    required: true,
                    message: 'Please log in',
                  },
                ]}
              >
                <Input placeholder="login name" />
              </Form.Item>
            </Col>
            
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <Form.Item
                label={fieldLabels.owner}
                name="follower_server"
                rules={[
                  {
                    required: true,
                    message: 'Please select server',
                  },
                ]}
              >
                <Select placeholder="">
                  <Option value="us01">us01</Option>
                  <Option value="us03">us03</Option>
                  <Option value="us07">us07</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Suffix" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="Suffix"
                name="suffix"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              >
                <TextArea placeholder="USDAUD..." />
              </Form.Item>
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <Form.Item
                label="UUID"
                name="uuid"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
              >
                <Input placeholder="" value={uuid} />
              </Form.Item>
            </Col>
           
          </Row>
        </Card>
        <Card title="Sender Details" bordered={false}>
          {/* <Form.Item name="members">
            <TableForm />
          </Form.Item> */}
           <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      label="Login"
                      name={[name, 'sender_login']}
                      fieldKey={[fieldKey, 'sender_login']}
                      rules={[{ required: true, message: 'Missing login name' }]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                    <Form.Item
                       {...restField}
                        label="Server"
                        name="sender_server"
                        fieldKey={[fieldKey, 'sender_server']}
                        rules={[
                          {
                            required: true,
                            message: 'Please select server',
                          },
                        ]}
                      >
                        <Select placeholder="" style={{ width: '90px' }}>
                          <Option value="us01">us01</Option>
                          <Option value="us03">us03</Option>
                          <Option value="us07">us07</Option>
                        </Select>
                      </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Lot Size Multiplier"
                      name={[name, 'lotMultiplier']}
                      fieldKey={[fieldKey, 'lotMultiplier']}
                      rules={[{ 
                        required: true, message: 'Missing Lot Size'                        
                      },{type: 'number', min: 0 }                       
                      ]}
                    >
                      <InputNumber placeholder="" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Fix Lot Size"
                      name={[name, 'fixLotSize']}
                      fieldKey={[fieldKey, 'fixLotSize']}
                      rules={[{ 
                        required: true, message: 'Missing Fix Lot Size'                   
                      },{type: 'number', min: 0 }
                    ]}
                    >
                      <InputNumber placeholder="" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);

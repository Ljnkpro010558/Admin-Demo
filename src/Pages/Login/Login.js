import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAuth } from "../../Redux/Login/loginReducer";
import { LoginAction } from "../../Redux/Login/action";
import { ACTION } from "../../Assets/ActionType";
import FormInput from '../../Copomnent/Common/FormItem/Input'
import { useIntl } from 'react-intl'
const Login = () => {
  const intl = useIntl()
  let Navigate = useNavigate(); 
  const dispatch = useDispatch();
  const isLog = useSelector(selectAuth); 
  useEffect(() => {
    if (!isLog) {
      Navigate("/");
    } else {
      Navigate("/Users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLog]);

  const onFinish = (values) => {
    dispatch(LoginAction(ACTION.USER_LOGIN, values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }} 
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FormInput 
       label={intl.formatMessage({id: 'form.userName'})}
       maxLength={50}
       name="email"
       rules={[
         {
           required: true,
           message: "Please input your username!",
         },
         {
          max: 50,
          message: "Please input your username!",
        },
       ]}
      /> 

      <FormInput 
       label={intl.formatMessage({id: 'form.password'})}
        name="password"
        maxLength={50}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        type={'password'}
      /> 
      

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {intl.formatMessage({ id: 'Button.Login' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

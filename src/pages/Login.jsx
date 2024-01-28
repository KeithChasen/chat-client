import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { 
        loginUser,
        updateLoginInfo,
        loginError,
        loginLoading,
        loginInfo
    } = useContext(AuthContext);
    return ( <>
        <Form onSubmit={loginUser}>
            <Row style={{ 
                height: "100vh",
                justifyContent: 'center',
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Login</h2>

                        <Form.Control onChange={e => updateLoginInfo({ ...loginInfo, email: e.target.value })} type="email" placeholder="Email"/>
                        <Form.Control onChange={e => updateLoginInfo({ ...loginInfo, password: e.target.value })} type="password" placeholder="Password"/>
                        <Button variant="primary" type='submit'>
                            { loginLoading ? 'Loading...' : 'Login'}
                        </Button>

                        {
                            loginError && 
                            <Alert variant="danger">
                                <p>{loginError}</p>
                            </Alert> 
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    </> );
}
 
export default Login;
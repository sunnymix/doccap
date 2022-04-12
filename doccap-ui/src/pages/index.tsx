import styles from './index.less';
import { Row, Col, Tabs, Select, Space, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import Doc from '@/components/doc/Doc';

const { TabPane } = Tabs;
const { Option } = Select;

export default function Page() {

  return (
    <Router basename='/doccap-ui/'>
      <Switch>
        <Route
          path="/:module?/:p1?/:p2?"
          render={({ match, history }) => {
            // console.log(match);

            return (
              <div
                style={{
                  padding: 5
                }}>
                <Tabs
                  size="middle"
                  defaultActiveKey={match.params.module || "home"}
                  onChange={ key => history.push(`/${key}`)}
                >
                  <TabPane tab="Home" key="home">
                    Home
                  </TabPane>
                  <TabPane tab="Doc" key="doc">
                    <Doc/>
                  </TabPane>
                </Tabs>
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
};

import styles from './index.less';
import { Row, Col, Tabs, Select, Space, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import DocRoutes from '@/components/doc/DocRoutes';
import MediaFacade from '@/components/media/MediaFacade';

const { TabPane } = Tabs;
const { Option } = Select;

export default function Page() {

  return (
    <Router basename="/wingdoc-ui/">
      <Switch>
        <Route
          path="/:module?/:p1?/:p2?"
          render={({ match, history }) => {
            return (
              <div
                style={{
                  padding: 10
                }}>
                <Tabs
                  size="middle"
                  defaultActiveKey={match.params.module || "wing"}
                  onTabClick={ key => history.push(`/${key}`)}
                >
                  <TabPane tab="Wing" key="wing">
                    Wing
                  </TabPane>
                  <TabPane tab="Doc" key="doc">
                    <DocRoutes id={match.params.p1}/>
                  </TabPane>
                  <TabPane tab="Media" key="media">
                    <MediaFacade id={match.params.p1}/>
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

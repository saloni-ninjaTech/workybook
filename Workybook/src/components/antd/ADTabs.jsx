import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function ADTabs({ className, elements, ...props }) {
  const navigate = useNavigate();
  const { source } = useParams();
  return (
    <Tabs
      activeKey={source}
      onChange={(path) => {
        navigate(`../${path}`); // sibling path
      }}
      className={`${className ?? ''}${' '}
      ad-tabs
      `}
      //   custom props styles override
      {...props}
    >
      {elements.map((el, tabPaneClassName, { ...rest }) => (
        <TabPane
          tab={el.tabTitle}
          key={el.path}
          className={`${tabPaneClassName ?? ''}${' '}
        `}
          {...rest}
        >
          {el.tabBody}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default ADTabs;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import UsersList from './components/UsersList'
import UserPosts from './components/UserPosts'
import Tasks from './components/Tasks'
import Navigation from './components/Navigation'
import './App.css'

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <Navigation />
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/user/:userId/posts" element={<UserPosts />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
